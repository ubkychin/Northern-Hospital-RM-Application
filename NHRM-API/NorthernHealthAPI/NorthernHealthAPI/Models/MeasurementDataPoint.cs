using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class MeasurementDataPoint
    {
        public MeasurementDataPoint()
        {
            MeasurementResult = new HashSet<MeasurementResult>();
        }

        public int MeasurementId { get; set; }
        public int DataPointNumber { get; set; }
        public int UpperLimit { get; set; }
        public int LowerLimit { get; set; }
        public string Description { get; set; }

        public virtual Measurement Measurement { get; set; }
        public virtual ICollection<MeasurementResult> MeasurementResult { get; set; }
    }
}
