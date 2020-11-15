using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NorthernHealthAPI.Models
{
    public class PatientMeasurementRecord
    {
        public DateTime DateTimeRecorded { get; set; }
        public double Value { get; set; }
    }
}
