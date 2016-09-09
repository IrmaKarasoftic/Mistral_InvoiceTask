using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Task_API.Models;
using TaskDb;

namespace Task_API.Helpers
{
    public class YearlyIncomeHelper
    {
        public static YearlyIncomeModel GetRevenueByYear(int year, AppContext context)
        {
            ModelFactory factory = new ModelFactory();
            YearlyIncomeModel model = new YearlyIncomeModel();
            Repository<Invoice> companyRepository = new Repository<Invoice>(context);
            double total = 0;

            foreach (var item in companyRepository.context.InvoiceItems)
            {
<<<<<<< HEAD
                if (item.Invoice.Date.Year == year)
=======
                if(item.Invoice.Date.Year == year)
>>>>>>> c76b89f8b77a2814379ae922e2b77ab409072799
                {
                    total += item.Item.UnitPrice * item.Item.Quantity;
                    model.Items.Add(factory.Create(item.Item));
                }
            }
            return model;
        }
    }
}