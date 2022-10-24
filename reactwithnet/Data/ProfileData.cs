using System.ComponentModel.DataAnnotations;

namespace reactwithnet.Data
{
    public class ProfileData
    {

        [StringLength(16)]
        [MinLength(3)]
        public string? Username { get; set; }
        [Required(ErrorMessage = "Email is required")]

        
        [MinLength(3), MaxLength(128)]
        public string? Email { get; set; }

        [MinLength(1), MaxLength(56)]
        public string? FirstName { get; set; }

        [MinLength(1), MaxLength(56)]
        public string? LastName { get; set; }



        [MinLength(8), MaxLength(256)]
        public string? Password { get; set; }

        [Compare("Password", ErrorMessage = "Password didn't match")]
        [MinLength(8), MaxLength(256)]
        public string? ConfirmPassword { get; set; }

    }
}
