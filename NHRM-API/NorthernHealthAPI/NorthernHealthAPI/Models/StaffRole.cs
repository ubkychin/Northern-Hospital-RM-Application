using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class StaffRole
    {
        public StaffRole()
        {
            Staff = new HashSet<Staff>();
        }

        public int RoleId { get; set; }
        public string StaffType { get; set; }

        public virtual ICollection<Staff> Staff { get; set; }
    }
}
