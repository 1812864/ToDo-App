using System.ComponentModel.DataAnnotations;
using core_API.Models;

namespace core_API.Models
{
    public class CategoryModel
    {
        public string? CategoryName { get; set; }
        [Required, MaxLength(50)]
        public string? Code { get; set; }
        public Guid TodoId { get; set; }
        public Guid? ParentId { get; set; }
    }
}
