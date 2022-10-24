using Microsoft.ML.Data;

namespace reactwithnet.Models
{
    public class DiseaseModel
    {
        [LoadColumn(0)]
        [ColumnName("Label")]
        public string? Disease { get; set; }

        [LoadColumn(1,16)]
        public string[]? Symptoms { get; set; }



    }
}
