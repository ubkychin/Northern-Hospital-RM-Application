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
        [HttpGet, Route("patient/{urNumber}"), Authorize(Roles = "Patient")]
        public async Task<IActionResult> GetPatient(string urNumber)
        {
            //Get Patient, Categories and Measurements Assigned
            var patient = await _context.Patient
                .Where(p => p.Urnumber == urNumber)
                .Select(p => new
                {
                    Name = p.FirstName,
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

                }).ToListAsync();

            return Ok(patient.SingleOrDefault());

        }

        //  GET api/frequency/{urNumber}
        //  Accepts a URNumber (string) and returns true if My Drainage Frequncy Changes
        [HttpGet, Route("frequency/{urNumber}"), Authorize(Roles = "Patient")]
        public async Task<IActionResult> FrequencyChangeAlert(string urNumber, int categoryId)
        {
            var lastFluid = GetLastFluid(urNumber, categoryId);

            //return Ok(lastFluid);
            if (lastFluid != null)
            {
                var frequency = await _context.PatientMeasurement
                    .Where(pm => pm.Urnumber == urNumber && pm.CategoryId == categoryId && pm.MeasurementId == 4)
                    .Select(pm => new
                    {
                        pm.Frequency,
                        pm.FrequencySetDate
                    }).ToListAsync();

                if (lastFluid.DateTimeRecorded < frequency.SingleOrDefault().FrequencySetDate)
                {
                    return Ok(new { change = true, frequency = frequency.SingleOrDefault().Frequency });
                }
                else
                {
                    return Ok(new { change = false });
                }
            }
            else
            {
                return Ok(new { change = false });
            }
        }

        //  GET api/condition
        //  Accepts a URNumber (string) and returns a Patient Condition Details
        [HttpGet, Route("condition/{urNumber}"), Authorize(Roles = "Patient")]
        public async Task<IActionResult> GetIPCConditionDetails(string urNumber, int categoryId)
        {
            //Get patients last Fluid Drainage Data
            var lastFluid = GetLastFluid(urNumber, categoryId);

            //Get patients last Breath Score Data
            var lastBreath = GetLastBreath(urNumber, categoryId);

            //Get patients last Pain Score Data
            var lastPain = GetLastPain(urNumber, categoryId);

            //If lastFluid/lastBreath/lastPain were retrieved from DB, compile ConditionDetails
            if (lastFluid != null && lastBreath != null && lastPain != null)
            {
                //Get Patient Condition Details for Category
                var details = await _context.ConditionDetails
                    .Where(p => p.Urnumber == urNumber && p.CategoryId == categoryId)
                    .Select(p => new
                    {
                        p.Diagnosis,
                        p.ProcedureDate,
                        p.NextAppointment,
                        MyDrainage = new DrainageDetails
                        {
                            Frequency = _context.PatientMeasurement.Where(pm => pm.Urnumber == urNumber && pm.MeasurementId == 4)
                                                                       .Select(pm => pm.Frequency).SingleOrDefault(),
                            FluidScore = lastFluid.Value,
                            DrainageDate = lastFluid.DateTimeRecorded,
                            BreathScore = lastBreath.Value,
                            PainScore = lastPain.Value
                        }
                    }).ToListAsync();

                return Ok(details.SingleOrDefault());
            }
            else
            {
                //Get Patient Condition Details for Category without MyDrainage
                var details = await _context.ConditionDetails
                    .Where(p => p.Urnumber == urNumber && p.CategoryId == categoryId)
                    .Select(p => new
                    {
                        p.Diagnosis,
                        p.ProcedureDate,
                        p.NextAppointment
                    }).ToListAsync();

                return Ok(details.SingleOrDefault());
            }

        }

        //  GET api/patient/resources/{urNumber}
        //  Accepts a URNumber (string) and returns all Resources assigned to a Patient 
        [HttpGet, Route("resources/{urNumber}"), Authorize(Roles = "Patient")]
        public async Task<IActionResult> GetPatientResources(string urNumber, int categoryId)
        {
            //Get all Resources that have been assigned to a Patient
            var resIdList = await _context.PatientResource
                .Where(pr => pr.Urnumber == urNumber && pr.CategoryId == categoryId)
                .Select(rid => rid.ResourceId)
                .ToListAsync();

            if (resIdList.Count() != 0)
            {
                List<ResourceCustom> resourceList = new List<ResourceCustom>();

                foreach (var res in resIdList)
                {
                    resourceList.Add(await _context.Resource.Where(r => r.ResourceId == res)
                         .Select(r => new ResourceCustom
                         {
                             CategoryId = categoryId,
                             Title = r.Title,
                             Prompt = r.Prompt,
                             ResType = GetResource(r.TypeId),
                             ResContent = GetResourceContent(GetResource(r.TypeId), r.ResourceId, r.Content)

                         }).SingleOrDefaultAsync());
                }

                return Ok(resourceList);
            }
            else
                return NoContent();
        }

        //  GET api/patient/disabledMeasurements/{urNumber}
        //  Accepts a URNumber (string) and returns all measurements that should be disabled in the app 
        [HttpGet, Route("disabledMeasurements/{urNumber}"), Authorize(Roles = "Patient")]
        public async Task<IActionResult> GetMeasurementsToDisable(string urNumber)
        {
            //List of disabled measurements to return
            List<int> disabledMeasurements = new List<int>();

            //Get all distinct patient measurements and frequency
            var patientMeasurements = await _context.PatientMeasurement
                .Where(pm => pm.Urnumber == urNumber)
                .Select(pm => new
                {
                    pm.MeasurementId,
                    pm.Frequency
                }).Distinct().ToListAsync();

            // Iterate through every measurement and check last record recorded against Frequency 
            foreach (var pm in patientMeasurements)
            {
                var lastRecorded = await _context.MeasurementRecord.
                    Where(mr => mr.MeasurementId == pm.MeasurementId
                    && mr.Urnumber == urNumber).OrderByDescending(lr => lr.DateTimeRecorded).FirstOrDefaultAsync();

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
        [HttpPost, Route("recordmeasurement"), Authorize(Roles = "Patient")]
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

        public static PatientMeasurementRecord GetLastFluid(string urNumber, int categoryId)
        {
            NHRMDBContext _con = new NHRMDBContext();

            var lastFluid = _con.MeasurementRecord.Join(_con.DataPointRecord,
                m => m.MeasurementRecordId,
                d => d.MeasurementRecordId,
                (m, d) => new { m, d })
                .Where(md => md.m.Urnumber == urNumber && md.m.CategoryId == categoryId && md.m.MeasurementId == 4)
                .Select(md => new PatientMeasurementRecord
                {
                    DateTimeRecorded = md.m.DateTimeRecorded,
                    Value = md.d.Value
                }).ToList().OrderBy(o => o.DateTimeRecorded).LastOrDefault();

            return lastFluid;
        }

        public static PatientMeasurementRecord GetLastBreath(string urNumber, int categoryId)
        {
            NHRMDBContext _con = new NHRMDBContext();

            var lastBreath = _con.MeasurementRecord.Join(_con.DataPointRecord,
                m => m.MeasurementRecordId,
                d => d.MeasurementRecordId,
                (m, d) => new { m, d })
                .Where(md => md.m.Urnumber == urNumber && md.m.CategoryId == categoryId && md.m.MeasurementId == 2)
                .Select(md => new PatientMeasurementRecord
                {
                    DateTimeRecorded = md.m.DateTimeRecorded,
                    Value = md.d.Value
                }).ToList().OrderBy(o => o.DateTimeRecorded).LastOrDefault();

            return lastBreath;
        }

        public static PatientMeasurementRecord GetLastPain(string urNumber, int categoryId)
        {
            NHRMDBContext _con = new NHRMDBContext();

            var lastPain = _con.MeasurementRecord.Join(_con.DataPointRecord,
                m => m.MeasurementRecordId,
                d => d.MeasurementRecordId,
                (m, d) => new { m, d })
                .Where(md => md.m.Urnumber == urNumber && md.m.CategoryId == categoryId && md.m.MeasurementId == 3)
                .Select(md => new PatientMeasurementRecord
                {
                    DateTimeRecorded = md.m.DateTimeRecorded,
                    Value = md.d.Value
                }).ToList().OrderBy(o => o.DateTimeRecorded).LastOrDefault();

            return lastPain;
        }

        // Accepts a typeId (string) as a parameter and returns it's resource type, as a string
        public static string GetResource(int typeId)
        {
            NHRMDBContext _con = new NHRMDBContext();

            return _con.ResourceType.Where(rt => rt.ResourceTypeId == typeId).Select(t => t.TypeName).SingleOrDefault();
        }

        //Accepts a type (string), resId (int) and content (string) as parameters and returns the appropriate content. If the type
        // is a 'dialog' the content returned will be an object with Heading, Content and Video properties
        private static dynamic GetResourceContent(string type, int resId, string content)
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