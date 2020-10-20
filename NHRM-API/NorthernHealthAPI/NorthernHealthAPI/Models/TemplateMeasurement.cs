using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class TemplateMeasurement
    {
        public int MeasurementId { get; set; }
        public int CategoryId { get; set; }

        public virtual TemplateCategory Category { get; set; }
        public virtual Measurement Measurement { get; set; }
    }
}
