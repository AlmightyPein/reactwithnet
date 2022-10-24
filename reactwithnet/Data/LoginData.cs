using System.ComponentModel.DataAnnotations;
namespace reactwithnet.Data
{
    public class LoginData
    {
        [Required]
        [MinLength(3), MaxLength(16)]
        public string UserName { get; set;}

        [Required]
        public string Password { get; set;}


    }
}
