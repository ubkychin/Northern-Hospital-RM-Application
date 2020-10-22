using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class PatientResource
    {
        public int CategoryId { get; set; }
        public string Urnumber { get; set; }
        public int ResourceId { get; set; }

        public virtual PatientCategory PatientCategory { get; set; }
        public virtual Resource Resource { get; set; }
    }
}
