using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class PatientMeasurement
    {
        public PatientMeasurement()
        {
            MeasurementRecord = new HashSet<MeasurementRecord>();
        }

        public int MeasurementId { get; set; }
        public int CategoryId { get; set; }
        public string Urnumber { get; set; }

        public virtual Measurement Measurement { get; set; }
        public virtual PatientCategory PatientCategory { get; set; }
        public virtual ICollection<MeasurementRecord> MeasurementRecord { get; set; }
    }
}
