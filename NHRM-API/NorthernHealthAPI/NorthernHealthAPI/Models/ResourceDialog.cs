using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class ResourceDialog
    {
        public int ResourceDialogId { get; set; }
        public string Heading { get; set; }
        public string Content { get; set; }
        public string Video { get; set; }
        public int ResourceId { get; set; }

        public virtual Resource Resource { get; set; }
    }
}
