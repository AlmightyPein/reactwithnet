
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using System.Text.Json.Serialization;
namespace reactwithnet.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    [JsonNumberHandling(JsonNumberHandling.AllowReadingFromString)]
    public class CovidDataController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;
        public CovidDataController(IHttpClientFactory httpClientFactory) =>
               _httpClientFactory = httpClientFactory;

        [HttpGet]
        
        public async Task<IEnumerable<CovidData>> Onget()
        {
            var request = new HttpRequestMessage(HttpMethod.Get, "https://www.mohfw.gov.in/data/datanew.json");
            var httpClient = _httpClientFactory.CreateClient();
            var response = await httpClient.SendAsync(request);
            
            if (response.IsSuccessStatusCode)
            {
                using var content = await response.Content.ReadAsStreamAsync();
                var options = new JsonSerializerOptions
                {
                    WriteIndented = true,
                    NumberHandling = JsonNumberHandling.AllowReadingFromString,
                    
                    

            };

                var data = await JsonSerializer.DeserializeAsync<IEnumerable<CovidData>>(content, options);
                return data;
            }
            
            return Enumerable.Empty<CovidData>();
        }
    }
}
