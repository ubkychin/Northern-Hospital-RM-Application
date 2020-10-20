using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class Staff
    {
        public Staff()
        {
            Patient = new HashSet<Patient>();
            Treating = new HashSet<Treating>();
        }

        public string StaffId { get; set; }
        public string FirstName { get; set; }
        public string SurName { get; set; }
        public byte[] Password { get; set; }
        public string Salt { get; set; }
        public int RoleId { get; set; }

        public virtual StaffRole Role { get; set; }
        public virtual ICollection<Patient> Patient { get; set; }
        public virtual ICollection<Treating> Treating { get; set; }
    }
}
