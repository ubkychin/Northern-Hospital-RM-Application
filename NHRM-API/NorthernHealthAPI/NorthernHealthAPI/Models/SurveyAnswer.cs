using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class SurveyAnswer
    {
        public int MeasurementId { get; set; }
        public int DataPointNumber { get; set; }
        public int AnswerNumber { get; set; }
        public string AnswerText { get; set; }
        public int Value { get; set; }

        public virtual SurveyQuestion SurveyQuestion { get; set; }
    }
}
