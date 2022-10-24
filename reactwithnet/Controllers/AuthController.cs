using Microsoft.AspNetCore.Mvc;
using reactwithnet.Data;
using reactwithnet.Models;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using reactwithnet.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using System.Linq;

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
        [HttpPost("isUniqueUser")]
        public bool isUniqueUser([FromBody]string username)
        {
            try{
            var isunique = _userContext.Users.FirstOrDefault(user=>user.Username!=username);
            return true;
            }
            catch(Exception ex)
            {
                Console.WriteLine(ex.Message);
                 return false;
            }
            
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
                 mail.SendEmail("smtpt9602@gmail.com", "shikharmishra.nu@gmail.com", "smtp.gmail.com", "smtpt9602@gmail.com", "twuhtixxcgkpixva", "Test for Authentication", $"<a href='{ this.Request.Scheme}://{this.Request.Host}{this.Request.PathBase}/ConfirmEmail?token={User.ConfirmationToken}'>Click on this link to verify</a>");
                //Console.WriteLine();
                return Ok("Registered successfully");
            }
            catch (Exception ex)
            {
            
                Console.WriteLine(ex.Message);
                return BadRequest("Something Went wrong");
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

        [ApiExplorerSettings(IgnoreApi = true)]
        protected async void  GenerateCookie(UserModel user)
        {
            var claims = new List<Claim>
            {
               new Claim(ClaimTypes.NameIdentifier, user.ConfirmationToken.ToString()),
               new Claim(ClaimTypes.Role, "User"),
            };
            var claimsIdentity = new ClaimsIdentity(
            claims, CookieAuthenticationDefaults.AuthenticationScheme);
            var authProperties = new AuthenticationProperties
            {
               
                //AllowRefresh = <bool>,
                // Refreshing the authentication session should be allowed.

                //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                // The time at which the authentication ticket expires. A 
                // value set here overrides the ExpireTimeSpan option of 
                // CookieAuthenticationOptions set with AddCookie.

                //IsPersistent = true,
                // Whether the authentication session is persisted across 
                // multiple requests. When used with cookies, controls
                // whether the cookie's lifetime is absolute (matching the
                // lifetime of the authentication ticket) or session-based.

                //IssuedUtc = <DateTimeOffset>,
                // The time at which the authentication ticket was issued.

                //RedirectUri = <string>
                // The full path or absolute URI to be used as an http 
                // redirect response value.
            };
            await HttpContext.SignInAsync(
            CookieAuthenticationDefaults.AuthenticationScheme,
            new ClaimsPrincipal(claimsIdentity),
            authProperties);
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> LoginUser(LoginData data)
        {

            try
            {
                var User = _userContext.Users.FirstOrDefault(u => u.Username == data.UserName);
                if (User != null)
                {
                    string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: data.Password,
                    salt: User.Salt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                    numBytesRequested: 256 / 8));


                    if (hashed.Equals(User.Password))
                    {
                        GenerateCookie(User);
                        return Ok("Logged in Successfully");
                    }
                }
                return BadRequest("Username or Password is wrong");
                
            }
            catch(Exception ex)
            {
                Console.Error.WriteLine(ex.Message);
                return BadRequest("Something went wrong");
            }
    
        }
        [HttpGet("test")]
        [Authorize]
        public ActionResult<string> test()
        {
            return Ok("dfd");
        }

        [HttpGet("CheckAuth")]
        [Authorize]
        public bool CheckAuth()
        {
            return true;
        }

        [HttpGet("getprofiledata")]
        [Authorize]
        public ActionResult<ProfileData> GetProfileData()
        {
            var UID = HttpContext.User.Claims.First().Value;
            var User = _userContext.Users.FirstOrDefault(u => u.ConfirmationToken.ToString() == UID);
            if (User!=null)
            {
                ProfileData ProfileData = new ProfileData();
                ProfileData.Username = User.Username;
                ProfileData.FirstName = User.FirstName;
                ProfileData.LastName = User.LastName;
                ProfileData.Email = User.Email;
                

                return Ok(ProfileData);
            }
            return BadRequest("No such user exists");
        }
        [HttpPut("updatedata")]
        [Authorize]
        public ActionResult<string> UpdateData([FromBody]ProfileData data)
        {
            try
            {
                var UID = HttpContext.User.Claims.First().Value;
                var User = _userContext.Users.FirstOrDefault(u=>u.ConfirmationToken.ToString()==UID);
                if(User!=null)
                {
                    string hashed = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                    password: data.ConfirmPassword,
                    salt: User.Salt,
                    prf: KeyDerivationPrf.HMACSHA256,
                    iterationCount: 100000,
                    numBytesRequested: 256 / 8));

                    User.Username = data.Username;
                    User.FirstName = data.FirstName;
                    User.LastName = data.LastName;
                    User.Email = data.Email;
                    User.Password = hashed;
                    _userContext.SaveChanges();
                    
                    Console.WriteLine(User.Username);
                    return Ok("Data Updated succefully");
                }
                return BadRequest("you are trying something fishy, don't do it");
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);  
                return BadRequest("Something went wrong");
            }
        }
        [HttpPost("logout")]
        [Authorize]
        public ActionResult<string> LogOut()
        {
            try
            {
                HttpContext.SignOutAsync();
                return Ok("Logged Out succesfully");
            }
            catch(Exception ex)
            {
                return BadRequest("Something went wrong");
            }
        }
    }
}
