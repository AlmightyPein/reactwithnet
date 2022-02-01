using System.ComponentModel.DataAnnotations;

namespace reactwithnet.utils.CustomValidation
{
    public class MustBeTrue : ValidationAttribute
    {
        public string? Error { get; }
        public MustBeTrue(string? Error)
        {
            this.Error = Error;
        }
        protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
        {
           var Input = (bool?)value;
            if (Input == true)
            {
                return ValidationResult.Success;
            }
            else
            {
                
              return new ValidationResult(Error);
            }
                
            
        }
    }
}
