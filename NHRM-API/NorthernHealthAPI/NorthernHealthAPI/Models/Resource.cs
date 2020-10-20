using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class Resource
    {
        public Resource()
        {
            PatientResource = new HashSet<PatientResource>();
            ResourceDialog = new HashSet<ResourceDialog>();
            TemplateResource = new HashSet<TemplateResource>();
        }

        public int ResourceId { get; set; }
        public string Title { get; set; }
        public string Prompt { get; set; }
        public string Content { get; set; }
        public int TypeId { get; set; }

        public virtual ResourceType Type { get; set; }
        public virtual ICollection<PatientResource> PatientResource { get; set; }
        public virtual ICollection<ResourceDialog> ResourceDialog { get; set; }
        public virtual ICollection<TemplateResource> TemplateResource { get; set; }
    }
}
