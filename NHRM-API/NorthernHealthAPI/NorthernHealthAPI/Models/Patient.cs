using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class Patient
    {
        public Patient()
        {
            PatientCategory = new HashSet<PatientCategory>();
            PatientRecord = new HashSet<PatientRecord>();
            Treating = new HashSet<Treating>();
        }

        public string Urnumber { get; set; }
        public string Email { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string SurName { get; set; }
        public string Gender { get; set; }
        public DateTime Dob { get; set; }
        public string Address { get; set; }
        public string Suburb { get; set; }
        public string PostCode { get; set; }
        public string MobileNumber { get; set; }
        public string HomeNumber { get; set; }
        public string CountryOfBirth { get; set; }
        public string PreferredLanguage { get; set; }
        public byte[] Password { get; set; }
        public string Salt { get; set; }
        public bool LivesAlone { get; set; }
        public int RegisteredBy { get; set; }
        public bool Active { get; set; }

        public virtual Staff RegisteredByNavigation { get; set; }
        public virtual ICollection<PatientCategory> PatientCategory { get; set; }
        public virtual ICollection<PatientRecord> PatientRecord { get; set; }
        public virtual ICollection<Treating> Treating { get; set; }
    }
}
