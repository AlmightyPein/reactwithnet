using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace reactwithnet.Services
{
    public class MailService
    {
        public void SendEmail(string? From, string? To, string? SMTPAddress, string? login, string? password, string? Subject, string? Body)
        {
            var email = new MimeMessage();
            email.From.Add(MailboxAddress.Parse(From));
            email.To.Add(MailboxAddress.Parse(To));
            email.Subject = Subject;
            email.Body = new TextPart(TextFormat.Html) {Text=Body };
            using var smtp = new SmtpClient();
            smtp.Connect(SMTPAddress, 587, SecureSocketOptions.StartTls);
            smtp.Authenticate(login, password);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
        public void GenerateEmailConfirmationToken()
        {

        }
    }
}
