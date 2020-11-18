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

        public int StaffId { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string Surname { get; set; }
        public byte[] Password { get; set; }
        public string Salt { get; set; }
        public int RoleId { get; set; }

        public virtual StaffRole Role { get; set; }
        public virtual ICollection<Patient> Patient { get; set; }
        public virtual ICollection<Treating> Treating { get; set; }
    }
}
