using System;
using System.Collections.Generic;

namespace NorthernHealthAPI.Models
{
    public partial class Measurement
    {
        public Measurement()
        {
            DataPoint = new HashSet<DataPoint>();
            PatientMeasurement = new HashSet<PatientMeasurement>();
            TemplateMeasurement = new HashSet<TemplateMeasurement>();
        }

        public int MeasurementId { get; set; }
        public string MeasurementName { get; set; }
        public int Frequency { get; set; }

        public virtual ICollection<DataPoint> DataPoint { get; set; }
        public virtual ICollection<PatientMeasurement> PatientMeasurement { get; set; }
        public virtual ICollection<TemplateMeasurement> TemplateMeasurement { get; set; }
    }
}
