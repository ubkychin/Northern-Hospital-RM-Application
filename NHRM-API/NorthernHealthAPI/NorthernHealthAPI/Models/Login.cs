using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NorthernHealthAPI.Models
{
    public class Login
    {
        public string UserId { get; set; }
        public string Password { get; set; }
        public string? Role { get; set; }
    }
}
