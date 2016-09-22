using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Web;
using TaskDb;
using System.Net;
using Task_API.Models;

namespace Task_API.Helpers
{
    public class EmailHelper
    {
        public static void SendInvoiceEmail(EmailModel invoiceToPrint)
        {
            SmtpClient SmtpServer = EmailHelper.SetSmtp();
            String Username = System.Configuration.ConfigurationManager.AppSettings["invoiceTaskMistral"];
            AppContext context = new AppContext();
            Invoice Invoice = new Invoice();

            MailAddress from = new MailAddress(Username);
            string subject = "Invoice: ";

            MailMessage mail = new MailMessage();
            mail.IsBodyHtml = true;
            mail.From = from;
            mail.Subject = subject;

            double subtotal = 0;
            double taxRate = 0.17;
            double tax = 0;
            double total = 0;

            string bodyHtml = "<div class='modal-dialog modal-lg'> <div class='modal-content'> <div class='modal-header bg-info'> <button type='button' class='close' data-dismiss='modal'>&times;</button> <h2 class='modal-title'>INVOICE #" + invoiceToPrint.Id + " " + invoiceToPrint.Status + "</h2> </div><div class='modal-body'> <div class='row'> <div class='col-md-4'> <h2>XYZ<br/><small>Makes billing easy</small></h2> </div><div class='col-md-4 col-md-offset-4 text-right'> <h4>Date:" + invoiceToPrint.Date + "</h4> <h5>Invoice ID:" + invoiceToPrint.Id + "</h5> <h5>Customer ID:" + invoiceToPrint.Customer + "</h5> </div></div><div class='row'> <div class='col-md-4'> <div class='panel panel-default'> <div class='panel-heading'><h3 class='panel-title'><strong>From:</strong></h3></div><div class='panel-body'> <p>2854 Granville Lane</p><p>Newark, 07104</p><p>973-482-1872</p><p> </p><p> </p></div></div></div><div class='col-md-4 '> <div class='panel panel-info'> <div class='panel-heading'><h3 class='panel-title'><strong>Bill To:</strong></h3></div><div class='panel-body'> <p>Customer Name:" + invoiceToPrint.BillTo.Name + "</p><p>Company Name:" + invoiceToPrint.BillTo.CompanyName + "</p><p>Street Address:" + invoiceToPrint.BillTo.StreetAddress + "</p><p>City, Zip:" + invoiceToPrint.BillTo.City + ", " + invoiceToPrint.BillTo.ZipCode + "</p><p>Phone/Fax:" + invoiceToPrint.BillTo.PhoneNumber + "</p></div></div></div><div class='col-md-4'> <div class='panel panel-success'> <div class='panel-heading'><h3 class='panel-title'><strong>Ship To:</strong></h3></div><div class='panel-body'> <p>Customer Name:"+ invoiceToPrint.ShipTo.Name + "</p><p>Company Name:" + invoiceToPrint.ShipTo.CompanyName + "</p><p>Street Address:" + invoiceToPrint.ShipTo.StreetAddress + "</p><p>City, Zip:" + invoiceToPrint.ShipTo.City + ", " + invoiceToPrint.ShipTo.ZipCode + "</p><p>Phone/Fax:" + invoiceToPrint.ShipTo.PhoneNumber + "</p></div></div></div></div><table class='table table-hover'> <thead class='bg-primary'> <tr> <th class='col-md-1'><h4>ID</h4></th> <th class='col-md-2'><h4>Description</h4></th> <th class='col-md-2'><h4>Amount</h4></th> <th class='col-md-2'><h4>Quantity</h4></th> <th class='col-md-2'><h4>Total</h4></th> </tr></thead> <tbody> <tr>";

            foreach (InvoiceItemModel i in invoiceToPrint.Items)
            {
                bodyHtml += "<td class='col-md-1'>" + i.Id + "</td><td class='col-md-2'>" + i.Description + "</td><td class='col-md-2'>" + i.Price + "</td><td class='col-md-2'>" + i.Quantity + "</td><td class='col-md-2'>" + i.Quantity * i.Price + "</td>";
                subtotal += i.Quantity * i.Price;
            }
            tax = subtotal * taxRate;
            total = subtotal + tax;

            bodyHtml+= "</tr></tbody> </table> <div class='row'> <div class='col-md-3 col-md-offset-9'> <p><strong>Subtotal:"+subtotal+"</strong></p><p><strong>Tax Rate:"+taxRate+"</strong></p><p><strong>Tax:"+tax+"</strong></p><p><strong>Other: </strong></p><h3><strong>TOTAL:"+total+"</strong></h3> </div></div></div><div class='modal-footer bg-info'> <button type='button' class='btn btn-primary' onclick='sendEmail()'>Email the invoice</button> <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button> </div></div></div>"; 

           

            mail.Body = bodyHtml;
            mail.To.Add(new MailAddress(invoiceToPrint.MailTo));
        }

        private static SmtpClient SetSmtp()
        {
            SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com",587);
            SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
            SmtpServer.Credentials = new NetworkCredential("invoiceTaskMistral", "MistralTask");
            SmtpServer.EnableSsl = true;
            return SmtpServer;
        }
    }
}