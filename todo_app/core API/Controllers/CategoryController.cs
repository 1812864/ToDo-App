using core_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks.Dataflow;

namespace core_API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CategoryController : Controller
    {

        private readonly todoContext _todoContext;
        public CategoryController(todoContext todoContext)
        {
            _todoContext = todoContext;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var categoryList = _todoContext.Categories.ToList();
            return Ok(categoryList);
        }

        // GET api/<TodosController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(Guid id)
        {
            var category = _todoContext.Categories.SingleOrDefault(category => category.Id == id);
            if (category != null)
            {
                return Ok(category);
            }
            else
            {
                return NotFound();
            }
        }

        // GET api/<TodosController>/5
        [HttpGet("{id}")]
        public IActionResult GetTodoId(Guid id)
        {
            var category = _todoContext.Categories.Where(category => category.TodoId == id);
            if (category != null)
            {
                return Ok(category);
            }
            else
            {
                return NotFound();
            }
        }

        //POST api/<TodosController>
        [HttpPost]
        public IActionResult Create(CategoryModel model)
        {
            try
            {
                var category = new Category
                {
                    Id = Guid.NewGuid(),
                    TodoId = model.TodoId,
                    ParentId = model.ParentId,
                    CategoryName = model.CategoryName,
                    Code = model.Code,
                    CreateTime = DateTime.Now,
                    LastUpdate = DateTime.Now,
                };
                _todoContext.Add(category);
                _todoContext.SaveChanges();
                return Ok(category);
            }
            catch
            {
                return BadRequest();
            }
        }

        //PUT api/<TodosController>/5
        [HttpPut("{id}")]
        public IActionResult UpdateById(Guid id, CategoryModel model)
        {
            var category = _todoContext.Categories.SingleOrDefault(category => category.Id == id);
            if (category != null)
            {
                category.CategoryName = model.CategoryName;
                category.Code = model.Code;
                category.LastUpdate = DateTime.Now;
                _todoContext.SaveChanges();
                return Ok(category);
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
            var todo = _todoContext.Categories.SingleOrDefault(todo => todo.Id == id);

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
