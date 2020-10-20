using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class Treating
    {
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string HospitalNumber { get; set; }
        public string StaffId { get; set; }

        public virtual Patient HospitalNumberNavigation { get; set; }
        public virtual Staff Staff { get; set; }
    }
}
