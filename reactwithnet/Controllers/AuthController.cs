using Microsoft.AspNetCore.Mvc;
using reactwithnet.Data;
using reactwithnet.Models;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using reactwithnet.Services;
using Microsoft.EntityFrameworkCore;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace reactwithnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly UserContext _userContext;
        public AuthController(UserContext context)
        {
            _userContext = context;
        }
        // GET: api/<RegistrationController>
        [HttpPost("register")]
        public async Task<ActionResult<string>> CreateData([FromBody]RegistrationData data)
        {

            //Generate salt for hashing later
            byte[] salt = new byte[128 / 8];
            using (var rngCsp = RandomNumberGenerator.Create())
            {
                rngCsp.GetNonZeroBytes(salt);
            }
           

            // derive a 256-bit subkey (use HMACSHA256 with 100,000 iterations)
            string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: data.ConfirmPassword,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));
               


            var User = new UserModel {Username = data.Username, Email = data.Email, Password = hashed, Salt = salt, TosConsent = data.TosConsent};
            var mail = new MailService();

            //sendEmail
            //mail.SendEmail("smtpt9602@gmail.com", "shikharmishra.nu@gmail.com", "smtp.gmail.com", "smtpt9602@gmail.com", "@heheboi01", "Test for Authentication", "<h2>this is a test<h2>");
            try
            {
    
                _userContext.Add(User);
                _userContext.SaveChanges();
                 mail.SendEmail("smtpt9602@gmail.com", "shikharmishra.nu@gmail.com", "smtp.gmail.com", "smtpt9602@gmail.com", "@heheboi01", "Test for Authentication", $"<a href='{ this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}/ConfirmEmail?token={User.ConfirmationToken}'>Click on this link to verify</a>");
                //Console.WriteLine();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }
            
            Console.WriteLine(_userContext.Users.First().Username);
            return Ok("sdasd");
            
        }
       // [Route("api/[controller]/confirmemail")]
        [HttpPost("confirmemail")]

        public async Task<ActionResult<string>> ConfirmEmail([FromBody]string? token)
        {
            try
            {

                var MyUser = _userContext.Users.Single(user => user.ConfirmationToken.ToString() == token);
                MyUser.EmailVerified = true;
                _userContext.SaveChanges();
                return Ok("Email Confirmed");   
            }
            catch(Exception ex)
            {
                
                return BadRequest("Something Went Wrong");
            }
        }
        [HttpPost("login")]

        public async Task<ActionResult<string>> LoginUser(LoginData data)
        {

            try
            {
                var User = _userContext.Users.FirstOrDefault(u => u.Username == data.UserName);
                
                string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: data.Password,
                salt: User.Salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

                if (hashed.Equals( User.Password) && User!=null)
                {
                    Console.WriteLine(User.Username);
                }
            }
            catch(Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
            }
            return Ok("dsfd");
        }
    }
}
