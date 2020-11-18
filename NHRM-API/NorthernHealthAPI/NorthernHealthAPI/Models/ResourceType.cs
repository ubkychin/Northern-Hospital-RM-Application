using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class ResourceType
    {
        public ResourceType()
        {
            Resource = new HashSet<Resource>();
        }

        public int ResourceTypeId { get; set; }
        public string TypeName { get; set; }

        public virtual ICollection<Resource> Resource { get; set; }
    }
}
