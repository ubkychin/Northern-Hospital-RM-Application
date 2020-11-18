using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class DataPoint
    {
        public DataPoint()
        {
            DataPointRecord = new HashSet<DataPointRecord>();
        }

        public int MeasurementId { get; set; }
        public int DataPointNumber { get; set; }
        public int UpperLimit { get; set; }
        public int LowerLimit { get; set; }
        public string Name { get; set; }

        public virtual Measurement Measurement { get; set; }
        public virtual SurveyQuestion SurveyQuestion { get; set; }
        public virtual ICollection<DataPointRecord> DataPointRecord { get; set; }
    }
}
