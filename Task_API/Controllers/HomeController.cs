using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaskDb;

namespace Task_API.Controllers
{
    public class HomeController<E> : ApiController where E:class
    {
        private Repository<E> repository;

        public HomeController(Repository<E> _repo)
        {
            repository = _repo;
        }
    }
}
