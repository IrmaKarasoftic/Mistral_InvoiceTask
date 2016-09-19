using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;

namespace Task_API.Services
{
    public class InvoiceIdentityService : IInvoiceIdentityService
    {
        public string CurrentUser
        {
            get
            {
                return "irma";
                //return Thread.CurrentPrincipal.Identity.Name;
            }
        }
    }
}