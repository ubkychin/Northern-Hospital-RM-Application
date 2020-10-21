using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        //Get Patient Resources
        [HttpPost, Route("patient")]
        public IActionResult GetPatientResources(string hospitalNumber)
        {
            //Get all Resources that have been assigned to a Patient
            var patientResources = _context.PatientResource.Where(pr => pr.HospitalNumber == hospitalNumber).ToList();
            return Ok();
        }
    }
}
