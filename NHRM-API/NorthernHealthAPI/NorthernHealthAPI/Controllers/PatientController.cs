using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NorthernHealthAPI.Models;

namespace NorthernHealthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly NHRMDBContext _context;

        public PatientController(NHRMDBContext context)
        {
            _context = context;
        }

        public IActionResult HealthCheck()
        {
            return Content("This is the health check that will be used by the load balancer");
        }

        //  GET api/patient/{urNumber}
        //  Accepts a URNumber (string) and returns a Patient and their categories
        [HttpGet, Route("patient/{urNumber}"), Authorize]
        public IActionResult GetPatient(string urNumber)
        {
            //Get Patient, Categories and Measurements Assigned
            var patient = _context.Patient
                .Where(p => p.Urnumber == urNumber)
                .Select(p => new
                {
                    UrNumber = p.Urnumber,
                    PatientCategories = _context.PatientCategory
                                        .Where(pc => pc.Urnumber == p.Urnumber)
                                        .Select(pc => new
                                        {
                                            pc.CategoryId,
                                            MeasurementIds = _context.PatientMeasurement
                                            .Where(pm => pm.Urnumber == p.Urnumber && pm.CategoryId == pc.CategoryId)
                                            .Select(pm => pm.MeasurementId).ToList()
                                        }).ToList()

                })
                .ToList().SingleOrDefault();

            return Ok(patient);

        }

        //  GET api/patient/resources/{urNumber}
        //  Accepts a URNumber (string) and returns all Resources assigned to a Patient 
        [HttpGet, Route("resources/{urNumber}"), Authorize]
        public IActionResult GetPatientResources(string urNumber)
        {
            //Get all Resources that have been assigned to a Patient
            var resIdList = _context.PatientResource
                .Where(pr => pr.Urnumber == urNumber)
                .Select(rid => rid.ResourceId)
                .ToList();

            if (resIdList.Count() != 0)
            {
                List<ResourceCustom> resourceList = new List<ResourceCustom>();

                foreach (var res in resIdList)
                {
                    resourceList.Add(_context.Resource.Where(r => r.ResourceId == res)
                         .Select(r => new ResourceCustom
                         {
                             Title = r.Title,
                             Prompt = r.Prompt,
                             ResType = setResource(r.TypeId),
                             ResContent = setResourceContent(setResource(r.TypeId), r.ResourceId, r.Content)

                         }).SingleOrDefault());
                }

                return Ok(resourceList);
            }
            else
                return NoContent();
        }

        //  GET api/patient/disabledMeasurements/{urNumber}
        //  Accepts a URNumber (string) and returns all measurements that should be disabled in the app 
        [HttpGet, Route("disabledMeasurements/{urNumber}"), Authorize]
        public IActionResult GetMeasurementsToDisable(string urNumber)
        {
            //List of disabled measurements to return
            List<int> disabledMeasurements = new List<int>();

            //Get all distinct patient measurements
            var patientMeasurements = _context.Measurement.Join(_context.PatientMeasurement,
                m => m.MeasurementId,
                pm => pm.MeasurementId,
                (m, pm) => new { m, pm }).Where(
                pm => pm.pm.Urnumber == urNumber).Select(
                patientMeasurements => new
                {
                    patientMeasurements.m.MeasurementId,
                    patientMeasurements.m.Frequency
                }).Distinct().ToList();

            // Iterate through every measurement and check last record recorded against Frequency 
            foreach (var pm in patientMeasurements)
            {
                var lastRecorded = _context.MeasurementRecord.
                    Where(mr => mr.MeasurementId == pm.MeasurementId
                    && mr.Urnumber == urNumber).OrderByDescending(lr => lr.DateTimeRecorded).FirstOrDefault();

                if (lastRecorded != null)
                {
                    if (lastRecorded.DateTimeRecorded.AddDays(pm.Frequency).DayOfYear > DateTime.Now.DayOfYear)
                        disabledMeasurements.Add(pm.MeasurementId);
                }

            }

            return Ok(disabledMeasurements);
        }

        //  GET api/patient/recordmeasurement
        //  Accepts a List of DataPointRecords, urNumber (string) and List of categoryId (int) - inserts a MeasurementRecord
        //  and all DataPointRecords sent
        //  If there is an error, the transaction will be rolled back
        [HttpPost, Route("recordmeasurement"), Authorize]
        public async Task<IActionResult> RecordMeasurement(List<DataPointRecord> records, string urNumber,
            [FromQuery(Name = "categoryIdList")] List<int> categoryId)
        {
            try
            {
                await _context.Database.BeginTransactionAsync();

                var recordedDate = DateTime.Now;

                foreach (int catId in categoryId)
                {
                    var measurementRecord = new MeasurementRecord
                    {
                        DateTimeRecorded = recordedDate,
                        MeasurementId = records.FirstOrDefault().MeasurementId,
                        CategoryId = catId,
                        Urnumber = urNumber
                    };

                    _context.MeasurementRecord.Add(measurementRecord);
                    await _context.SaveChangesAsync();

                    foreach (DataPointRecord record in records)
                    {
                        record.MeasurementRecordId = measurementRecord.MeasurementRecordId;
                        _context.DataPointRecord.Add(record);
                    }

                    await _context.SaveChangesAsync();
                }

                _context.Database.CommitTransaction();

            }
            catch (Exception ex)
            {
                _context.Database.RollbackTransaction();
                return BadRequest(ex.Message);
            }

            return Ok();

        }

        // Accepts a typeId (string) as a parameter and returns it's resource type, as a string
        public static string setResource(int typeId)
        {
            NHRMDBContext _con = new NHRMDBContext();

            return _con.ResourceType.Where(rt => rt.ResourceTypeId == typeId).Select(t => t.TypeName).SingleOrDefault();
        }

        //Accepts a type (string), resId (int) and content (string) as parameters and returns the appropriate content. If the type
        // is a 'dialog' the content returned will be an object with Heading, Content and Video properties
        private static dynamic setResourceContent(string type, int resId, string content)
        {
            NHRMDBContext _con = new NHRMDBContext();

            if (type.Equals("dialog"))
            {
                return _con.ResourceDialog.Where(rd => rd.ResourceId == resId)
                    .Select(rd => new
                    {
                        rd.Heading,
                        rd.Content,
                        rd.Video
                    }).SingleOrDefault();
            }
            else
            {
                return content;
            }
        }
    }
}

//PatientRecords = _context.PatientRecord.Where(pr => pr.Urnumber == p.Urnumber)
//                .Select(pr => new
//                {

//                    Record = _context.RecordType.Where(rt => rt.RecordTypeId == pr.RecordTypeId)
//                            .Select(rt => new
//                            {
//                                RecordCategory = _context.RecordCategory.Where(rc => rc.RecordCategoryId == rt.RecordCategoryId)
//                                                                        .Select(rc => rc.Category).SingleOrDefault(),
//                                RecordType = rt.RecordType1
//                            }).SingleOrDefault(),

//                    DateTimeRecorded = pr.DateTimeRecorded,
//                    Notes = pr.Notes
//                }).ToList()