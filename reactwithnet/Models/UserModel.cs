using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using reactwithnet.utils.CustomValidation;
namespace reactwithnet.Models
{
   // [Table("Users")]
    public class UserModel
    {

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        [RegularExpression("[a-zA-Z]", ErrorMessage = "Only alphabets are allowed")]
        [StringLength(16)]
        [Required(ErrorMessage ="Username is Required")]
        [MinLength(3)]
        public string? Username { get; set; }

        [Required(ErrorMessage = "Email is required")]
        //[Unique(ErrorMessage = "This already exist !!")]
        [MinLength(3), MaxLength(128)]
        [EmailAddress]

        public string? Email { get; set; }

        
        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        [MaxLength(512), MinLength(8)]
        public string? Password { get; set; }
        
        
        
        public byte[]? Salt { get; set; }

        [Required]
        [MustBeTrue("TOS must be accepted")]
        public bool TosConsent { get; set; }

        public bool EmailVerified { get; set; }

        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid ConfirmationToken{ get; set; } = Guid.NewGuid();

    }
    
}

