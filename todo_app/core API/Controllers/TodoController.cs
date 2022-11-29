using core_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks.Dataflow;

namespace core_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TodoController : Controller
    {

        private readonly todoContext _todoContext;
        public TodoController(todoContext todoContext)
        {
            _todoContext = todoContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var todoList = _todoContext.Todos.ToList();
            return Ok(todoList);
        }

        // GET api/<TodosController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var todo = _todoContext.Todos.SingleOrDefault(todo => todo.Id == id);
            if (todo != null)
            {
                return Ok(todo);
            }
            else
            {
                return NotFound();
            }
        }

        //POST api/<TodosController>
        [HttpPost]
        public IActionResult Create(TodoModel model)
        {
            try
            {
                var todo = new Todo
                {
                    Id = Guid.NewGuid(),
                    TodoName = model.TodoName,
                    Code = model.Code,
                    CreatedTime = DateTime.Now,
                    LastUpdated = DateTime.Now,
                };
                _todoContext.Add(todo);
                _todoContext.SaveChanges();
                return Ok(todo);
            }
            catch
            {
                return BadRequest();
            }
        }

        //PUT api/<TodosController>/5
        [HttpPut("{id}")]
        public IActionResult UpdateById(Guid id, TodoModel model)
        {
            var todo = _todoContext.Todos.SingleOrDefault(todo => todo.Id == id);
            if (todo != null)
            {
                todo.TodoName = model.TodoName;
                todo.Code = model.Code;
                todo.LastUpdated= DateTime.Now;
                _todoContext.SaveChanges();
                return Ok(todo);
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
            var todo = _todoContext.Todos.SingleOrDefault(todo => todo.Id == id);

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
