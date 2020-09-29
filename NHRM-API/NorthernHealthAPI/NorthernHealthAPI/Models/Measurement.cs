using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class Measurement
    {
        public Measurement()
        {
            MeasurementDataPoint = new HashSet<MeasurementDataPoint>();
        }

        public int MeasurementId { get; set; }
        public string MeasurementName { get; set; }

        public virtual ICollection<MeasurementDataPoint> MeasurementDataPoint { get; set; }
    }
}
