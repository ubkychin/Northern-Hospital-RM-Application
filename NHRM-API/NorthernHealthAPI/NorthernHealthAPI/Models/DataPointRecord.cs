using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class DataPointRecord
    {
        public int MeasurementId { get; set; }
        public int DataPointNumber { get; set; }
        public double Value { get; set; }
        public int? MeasurementRecordId { get; set; }

        public virtual DataPoint DataPoint { get; set; }
        public virtual MeasurementRecord MeasurementRecord { get; set; }
    }
}
