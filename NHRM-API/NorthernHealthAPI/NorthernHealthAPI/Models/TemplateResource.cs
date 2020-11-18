using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class TemplateResource
    {
        public int CategoryId { get; set; }
        public int ResourceId { get; set; }

        public virtual TemplateCategory Category { get; set; }
        public virtual Resource Resource { get; set; }
    }
}
