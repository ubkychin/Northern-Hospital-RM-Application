using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class PatientCategory
    {
        public PatientCategory()
        {
            MeasurementResult = new HashSet<MeasurementResult>();
        }

        public string HospitalNumber { get; set; }
        public int CategoryId { get; set; }

        public virtual Category Category { get; set; }
        public virtual Patient HospitalNumberNavigation { get; set; }
        public virtual ICollection<MeasurementResult> MeasurementResult { get; set; }
    }
}
