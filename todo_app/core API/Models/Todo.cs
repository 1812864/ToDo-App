using System;
using System.Collections.Generic;

namespace core_API.Models
{
    public partial class Todo
    {
        public Todo()
        {
            Categories = new HashSet<Category>();
            Elements = new HashSet<Element>();
        }

        public Guid Id { get; set; }
        public string TodoName { get; set; } = null!;
        public string? Code { get; set; }
        public DateTime? CreatedTime { get; set; }
        public DateTime? LastUpdated { get; set; }

        public virtual ICollection<Category> Categories { get; set; }
        public virtual ICollection<Element> Elements { get; set; }
    }
}
