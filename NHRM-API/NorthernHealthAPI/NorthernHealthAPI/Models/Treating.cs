using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class Treating
    {
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Urnumber { get; set; }
        public int StaffId { get; set; }

        public virtual Staff Staff { get; set; }
        public virtual Patient UrnumberNavigation { get; set; }
    }
}
