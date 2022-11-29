using System.ComponentModel.DataAnnotations;
using core_API.Models;

namespace core_API.Models
{
    public class TodoModel
    {
        public string? TodoName { get; set; }
        [Required, MaxLength(50)]
        public string? Code { get; set; }

    }
}
