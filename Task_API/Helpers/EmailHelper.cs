using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using TaskDb;
using System.Net;

namespace Task_API.Helpers
{
    public class EmailHelper
    {
        public static void SendInvoiceEmail(Invoice invoiceToPrint)
        {
            SmtpClient SmtpServer = EmailHelper.SetSmtp();
            String Username = System.Configuration.ConfigurationManager.AppSettings["username"];
            AppContext context = new AppContext();
            Invoice Invoice = new Invoice();

            MailAddress from = new MailAddress(Username);
            string subject = "Invoice " + invoiceToPrint.Id;
            string content = "<p>"+ "Thank you for your purchase." +"</p>"+"</br>";

            MailMessage mail = new MailMessage();
            mail.IsBodyHtml = true;
            mail.From = from;
            mail.Subject = subject;
            
        }

        private static SmtpClient SetSmtp()
        {
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com",587);
            SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
            SmtpServer.Credentials = new NetworkCredential("username", "password");
            SmtpServer.EnableSsl = true;
            return SmtpServer;
        }
    }
}