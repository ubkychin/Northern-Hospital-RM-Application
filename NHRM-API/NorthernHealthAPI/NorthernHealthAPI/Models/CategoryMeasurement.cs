using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class CategoryMeasurement
    {
        public int? MeasurementId { get; set; }
        public int? CategoryId { get; set; }

        public virtual Category Category { get; set; }
        public virtual Measurement Measurement { get; set; }
    }
}
