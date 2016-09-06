using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaskDb;

namespace Task_API.Controllers
{
    public class CompaniesController : HomeController<Company>
    {
        public CompaniesController(Repository<Company> repo):base(repo) {}

    }
}
