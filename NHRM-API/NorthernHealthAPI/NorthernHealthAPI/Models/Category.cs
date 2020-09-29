using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class Category
    {
        public Category()
        {
            PatientCategory = new HashSet<PatientCategory>();
        }

        public int CategoryId { get; set; }
        public string CategoryName { get; set; }

        public virtual ICollection<PatientCategory> PatientCategory { get; set; }
    }
}
