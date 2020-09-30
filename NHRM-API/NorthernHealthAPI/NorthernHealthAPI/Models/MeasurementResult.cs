using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class MeasurementResult
    {
        public string HospitalNumber { get; set; }
        public int CategoryId { get; set; }
        public int MeasurementId { get; set; }
        public int DataPointNumber { get; set; }
        public DateTime TimeStamp { get; set; }
        public int Value { get; set; }

        public virtual MeasurementDataPoint MeasurementDataPoint { get; set; }
        public virtual PatientCategory PatientCategory { get; set; }
    }
}
