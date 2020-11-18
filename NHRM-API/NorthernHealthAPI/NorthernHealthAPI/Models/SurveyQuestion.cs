using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class SurveyQuestion
    {
        public SurveyQuestion()
        {
            SurveyAnswer = new HashSet<SurveyAnswer>();
        }

        public int MeasurementId { get; set; }
        public int DataPointNumber { get; set; }
        public string CategoryName { get; set; }
        public string Question { get; set; }

        public virtual DataPoint DataPoint { get; set; }
        public virtual ICollection<SurveyAnswer> SurveyAnswer { get; set; }
    }
}
