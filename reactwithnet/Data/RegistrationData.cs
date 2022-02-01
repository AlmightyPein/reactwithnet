using reactwithnet.utils.CustomValidation;
using System.ComponentModel.DataAnnotations;

namespace reactwithnet.Data
{
    public class RegistrationData
    {
       [Required(ErrorMessage = "username is required")]

        [StringLength(16)]
        [MinLength(3)]
        public string? Username { get; set; }
        [Required(ErrorMessage = "Email is required")]

        [EmailAddress]
        [MinLength(3), MaxLength(128)]
        public string? Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        public string? Password { get; set; }

        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        [MaxLength(50), MinLength(8)]
        public string? ConfirmPassword { get; set; }

        [Required]
        [MustBeTrue("TOS must be accepted")]
        public bool TosConsent { get; set; }



    }
}
