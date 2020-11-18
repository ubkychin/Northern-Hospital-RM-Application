using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NorthernHealthAPI.Models
{
    public class PatientLogin
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string? Role { get; set; }
    }
}
