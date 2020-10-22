using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NorthernHealthAPI.Models
{
    public class ResourceCustom
    {
        public string Title { get; set; }
        public string Prompt { get; set; }
        public dynamic ResContent { get; set; }
        public string ResType { get; set; }
    }
}
