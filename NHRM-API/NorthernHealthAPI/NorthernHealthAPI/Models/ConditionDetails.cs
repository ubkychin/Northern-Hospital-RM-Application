using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class ConditionDetails
    {
        public int CategoryId { get; set; }
        public string Urnumber { get; set; }
        public string Diagnosis { get; set; }
        public DateTime? ProcedureDate { get; set; }
        public DateTime? NextAppointment { get; set; }

        public virtual PatientCategory PatientCategory { get; set; }
    }
}
