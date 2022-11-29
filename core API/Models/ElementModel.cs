using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using core_API.Models;

namespace core_API.Models
{
    public class ElementModel
    {
        public string? ElementName { get; set; }
        [Required, MaxLength(50)]
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public Guid TodoId { get; set; }
        public Guid? ParentId { get; set; }
    }
}
