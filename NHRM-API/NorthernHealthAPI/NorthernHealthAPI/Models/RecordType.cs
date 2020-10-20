using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class RecordType
    {
        public RecordType()
        {
            PatientRecord = new HashSet<PatientRecord>();
        }

        public int RecordTypeId { get; set; }
        public string RecordType1 { get; set; }
        public int RecordCategoryId { get; set; }

        public virtual RecordCategory RecordCategory { get; set; }
        public virtual ICollection<PatientRecord> PatientRecord { get; set; }
    }
}
