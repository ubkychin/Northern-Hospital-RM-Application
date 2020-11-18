using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class TemplateCategory
    {
        public TemplateCategory()
        {
            PatientCategory = new HashSet<PatientCategory>();
            TemplateMeasurement = new HashSet<TemplateMeasurement>();
            TemplateResource = new HashSet<TemplateResource>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public virtual ICollection<PatientCategory> PatientCategory { get; set; }
        public virtual ICollection<TemplateMeasurement> TemplateMeasurement { get; set; }
        public virtual ICollection<TemplateResource> TemplateResource { get; set; }
    }
}
