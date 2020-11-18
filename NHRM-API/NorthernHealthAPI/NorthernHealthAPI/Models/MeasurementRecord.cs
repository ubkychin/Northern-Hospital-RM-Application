using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class MeasurementRecord
    {
        public MeasurementRecord()
        {
            DataPointRecord = new HashSet<DataPointRecord>();
        }

        public int MeasurementRecordId { get; set; }
        public DateTime DateTimeRecorded { get; set; }
        public int MeasurementId { get; set; }
        public int CategoryId { get; set; }
        public string Urnumber { get; set; }

        public virtual PatientMeasurement PatientMeasurement { get; set; }
        public virtual ICollection<DataPointRecord> DataPointRecord { get; set; }
    }
}
