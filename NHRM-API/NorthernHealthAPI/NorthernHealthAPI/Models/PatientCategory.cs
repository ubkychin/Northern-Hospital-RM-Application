using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class PatientCategory
    {
        public PatientCategory()
        {
            PatientMeasurement = new HashSet<PatientMeasurement>();
            PatientResource = new HashSet<PatientResource>();
        }

        public int CategoryId { get; set; }
        public string HospitalNumber { get; set; }

        public virtual TemplateCategory Category { get; set; }
        public virtual Patient HospitalNumberNavigation { get; set; }
        public virtual ICollection<PatientMeasurement> PatientMeasurement { get; set; }
        public virtual ICollection<PatientResource> PatientResource { get; set; }
    }
}
