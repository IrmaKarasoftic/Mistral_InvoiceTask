using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Task_API.Models;
using TaskDb;

namespace Task_API.Controllers
{
    public class CostumersController : HomeController<Costumer>
    {
        public CostumersController(Repository<Costumer> repo):base(repo) {}

        public IHttpActionResult Get()
        {
            try
            {
                var costumers = Repository.Get().ToList().Select(x => Factory.Create(x)).ToList();
                if (costumers != null) return Ok(costumers);
                return NotFound();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        public IHttpActionResult Get(int id)
        {
            try
            {
                var costumer = Repository.Get(id);
                if (costumer != null) return Ok(costumer);
                return NotFound();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }

        public IHttpActionResult Post(CostumerModel costumer)
        {
            if (costumer != null)
            {
                try
                {
                    Repository.Insert(Parser.Create(costumer, Repository.HomeContext()));
                    return Ok();
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return NotFound();
        }

        public IHttpActionResult Put(CostumerModel costumer, int id)
        {
            if(costumer != null)
            {
                try
                {
                    Costumer co = Repository.Get(id);
                    Costumer cost = Parser.Create(costumer, Repository.HomeContext());
                    if (co != null) 
                    {
                        Repository.Update(cost, id);
                        return Ok(Factory.Create(cost));
                    }
                    return NotFound();
                }
                catch (Exception)
                {
                    return BadRequest();
                }
            }
            return NotFound();
        }
        
        public IHttpActionResult Delete(int id)
        {
            try
            {
                Costumer costumer = Repository.Get(id);
                if (costumer != null)
                {
                    Repository.Delete(id);
                    return Ok();
                }
                return NotFound();
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
