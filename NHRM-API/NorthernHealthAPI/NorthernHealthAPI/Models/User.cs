using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class User
    {
        public string Username { get; set; }
        public byte[] Password { get; set; }
        public string Salt { get; set; }
        public string UserType { get; set; }
    }
}
