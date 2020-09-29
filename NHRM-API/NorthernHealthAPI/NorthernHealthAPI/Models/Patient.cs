using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class Patient
    {
        public Patient()
        {
            PatientCategory = new HashSet<PatientCategory>();
        }

        public string HospitalNumber { get; set; }
        public string UserId { get; set; }
        public string Title { get; set; }
        public string Surname { get; set; }
        public string FirstName { get; set; }
        public string Gender { get; set; }
        public DateTime Dob { get; set; }
        public string Address { get; set; }
        public string Suburb { get; set; }
        public string Postcode { get; set; }
        public string Email { get; set; }
        public string MobileNumber { get; set; }
        public string HomeNumber { get; set; }
        public string CountryOfBirth { get; set; }
        public string PreferredLanguage { get; set; }
        public string Password { get; set; }
        public string Salt { get; set; }
        public bool LivesAlone { get; set; }

        public virtual ICollection<PatientCategory> PatientCategory { get; set; }
    }
}
