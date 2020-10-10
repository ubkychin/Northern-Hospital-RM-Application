using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NorthernHealthAPI.Models
{
    public class ResourceCustom
    {
        public int ResourceID { get; set; }
        public string Title { get; set; }
        public string Prompt { get; set; }
        public int CategoryID { get; set; }
        public dynamic Content { get; set; }
        public int TypeID { get; set; }
    }
}
