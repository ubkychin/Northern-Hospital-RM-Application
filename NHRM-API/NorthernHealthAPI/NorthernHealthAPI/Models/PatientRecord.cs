using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class PatientRecord
    {
        public DateTime DateTimeRecorded { get; set; }
        public string Notes { get; set; }
        public string HospitalNumber { get; set; }
        public int RecordTypeId { get; set; }

        public virtual Patient HospitalNumberNavigation { get; set; }
        public virtual RecordType RecordType { get; set; }
    }
}
