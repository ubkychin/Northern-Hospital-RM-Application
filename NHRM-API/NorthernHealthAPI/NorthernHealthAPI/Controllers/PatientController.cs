using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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

        //  GET api/patient/resources
        //  Accepts a hospitalNumber(URNumber) (string) and returns a Patient 
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
                                            CategoryId = pc.CategoryId,
                                            MeasurementIds = _context.PatientMeasurement
                                            .Where(pm => pm.Urnumber == p.Urnumber && pm.CategoryId == pc.CategoryId)
                                            .Select(pm => pm.MeasurementId).ToList()
                                        }).ToList()

                })
                .ToList();

            return Ok(patient);

        }

        //  GET api/patient/resources
        //  Accepts a hospitalNumber(URNumber (string) and finds all Resources belonging to a Patient 
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

        public static string setResource(int typeId)
        {
            NHRMDBContext _con = new NHRMDBContext();

            return _con.ResourceType.Where(rt => rt.ResourceTypeId == typeId).Select(t => t.TypeName).SingleOrDefault();
        }

        private static dynamic setResourceContent(string type, int resId, string content)
        {
            NHRMDBContext _con = new NHRMDBContext();

            if (type.Equals("dialog"))
            {
                return _con.ResourceDialog.Where(rd => rd.ResourceId == resId)
                    .Select(rd => new
                    {
                        Heading = rd.Heading,
                        Content = rd.Content,
                        Video = rd.Video
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