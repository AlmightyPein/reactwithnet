using AIDoctorOnline;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.ML;
using reactwithnet.Data;
using reactwithnet.Models;

namespace reactwithnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
       // [Authorize]
        [HttpPost("getdisease")]
        [Authorize]
        public string[] GetDisease([FromBody]string[] symptoms)
        {
            if (symptoms.Length <= 11)
            {
                //Load sample data
                var sampleData = new MLModel.ModelInput()
                {
                    Symptom_1 = symptoms[0],
                    Symptom_2 = symptoms[1],
                    Symptom_3 = symptoms[2],
                    Symptom_4 = symptoms[3],
                    Symptom_5 = symptoms[4],
                    Symptom_6 = symptoms[5],
                    Symptom_7 = symptoms[6],
                    Symptom_8 = symptoms[7],
                    Symptom_9 = symptoms[8],
                    Symptom_10 = symptoms[9],

                };

                //Load model and predict output
                var result = MLModel.Predict(sampleData);

                Console.WriteLine(sampleData.Symptom_1);
                string[] Disease = { $"{(result.Score.Max() * 100).ToString()}%", $"{result.PredictedLabel}" };

                return Disease;
            }
            else return new[] { "Something is wrong" };

        }

        [HttpPost("getdiseasefromimage")]
        [Authorize]
        public ActionResult<string[]> GetDiseaseFromImage([FromForm]IFormFile file)
        {
            try
            {
                if (file.Length > 0)
                {
                    using (var ms = new MemoryStream())
                    {
                        file.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        string s = Convert.ToBase64String(fileBytes);




                        Console.WriteLine(file.Length);
                        var imageBytes = fileBytes;
                        MLModel1.ModelInput sampleData = new MLModel1.ModelInput()
                        {
                            ImageSource = imageBytes,
                        };

                        //Load model and predict output
                        var result = MLModel1.Predict(sampleData);
                        
                        Console.Write(result.Label);
                        string[] Disease = { $"{(result.Score.Max() * 100).ToString()}%", $"{result.PredictedLabel}" };
                        return Disease;
                    }
                    // act on the Base64 data
                }
                else
                    return BadRequest("length is zero stupid");
                
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return BadRequest();
            }
            
                
            
        }
    }
}
