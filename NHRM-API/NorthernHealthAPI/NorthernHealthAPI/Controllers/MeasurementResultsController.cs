using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NorthernHealthAPI.Models;

namespace NorthernHealthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeasurementResultsController : ControllerBase
    {
        private readonly NHRMDBContext _context;

        public MeasurementResultsController(NHRMDBContext context)
        {
            _context = context;
        }

        // GET: api/MeasurementResults/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MeasurementResult>> GetMeasurementResult(int id)
        {
            var measurementResult = await _context.MeasurementResult.FindAsync(id);

            if (measurementResult == null)
            {
                return NotFound();
            }

            return measurementResult;
        }

        // PUT: api/MeasurementResults/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMeasurementResult(int id, MeasurementResult measurementResult)
        {
            if (id != measurementResult.MeasurementId)
            {
                return BadRequest();
            }

            _context.Entry(measurementResult).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MeasurementResultExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MeasurementResults
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MeasurementResult>> PostMeasurementResult(MeasurementResult measurementResult)
        {
            _context.MeasurementResult.Add(measurementResult);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MeasurementResultExists(measurementResult.MeasurementId))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMeasurementResult", new { id = measurementResult.MeasurementId }, measurementResult);
        }

        private bool MeasurementResultExists(int id)
        {
            return _context.MeasurementResult.Any(e => e.MeasurementId == id);
        }
    }
}
