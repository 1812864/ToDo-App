using core_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks.Dataflow;

namespace core_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ElementController : Controller
    {

        private readonly todoContext _todoContext;
        public ElementController(todoContext todoContext)
        {
            _todoContext = todoContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var elementList = _todoContext.Elements.ToList();
            return Ok(elementList);
        }

        // GET api/<TodosController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var element = _todoContext.Elements.SingleOrDefault(element => element.Id == id);
            if (element != null)
            {
                return Ok(element);
            }
            else
            {
                return NotFound();
            }
        }

        //POST api/<TodosController>
        [HttpPost]
        public IActionResult Create(ElementModel model)
        {
            try
            {
                var element = new Element
                {
                    Id = Guid.NewGuid(),
                    TodoId = model.TodoId,
                    ElementName = model.ElementName,
                    ParentId = model.ParentId,
                    Description = model.Description,
                    DueDate = DateTime.Now,
                    CreateTime = DateTime.Now,
                    LastUpdate = DateTime.Now,
                };
                _todoContext.Add(element);
                _todoContext.SaveChanges();
                return Ok(element);
            }
            catch
            {
                return BadRequest();
            }
        }

        //PUT api/<TodosController>/5
        [HttpPut("{id}")]
        public IActionResult UpdateById(Guid id, ElementModel model)
        {
            var element = _todoContext.Elements.SingleOrDefault(element => element.Id == id);
            if (element != null)
            {
                element.ElementName = model.ElementName;
                element.LastUpdate = DateTime.Now;
                _todoContext.SaveChanges();
                return Ok(element);
            }
            else
            {
                return NotFound();
            }
        }

        // DELETE api/<TodosController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var todo = _todoContext.Elements.SingleOrDefault(todo => todo.Id == id);

            if (todo != null)
            {
                _todoContext.Remove(todo);

                _todoContext.SaveChanges();

                return Ok("Success");
            }
            else
            {
                return NotFound();
            }
            return Ok();
        }

    }
}
