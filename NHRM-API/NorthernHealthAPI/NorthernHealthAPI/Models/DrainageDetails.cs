using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NorthernHealthAPI.Models
{
    public class DrainageDetails
    {
        public int Frequency { get; set; }
        public double FluidScore { get; set; }
        public DateTime DrainageDate { get; set; }
        public double BreathScore { get; set; }
        public double PainScore { get; set; }

    }
}
