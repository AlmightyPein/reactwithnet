using Newtonsoft.Json;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace reactwithnet
{
    public class CovidData
    {
        [JsonPropertyName("sno")]
        public int id { get; set; }

        [JsonPropertyName("state_name")]
        public string? name { get; set; }
        public int active { get; set; }
        public int positive { get; set; }
        public int cured { get; set; }
        public int death { get; set; }
        public int new_active { get; set; }
        public int new_positive { get; set; }
        public int new_cured { get; set; }
        public int new_death { get; set; }


    }
}
