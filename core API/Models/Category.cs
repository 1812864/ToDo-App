using System;
using System.Collections.Generic;

namespace core_API.Models
{
    public partial class Category
    {
        public Guid Id { get; set; }
        public Guid TodoId { get; set; }
        public Guid? ParentId { get; set; }
        public string? CategoryName { get; set; }
        public string? Code { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? LastUpdate { get; set; }

        public virtual Todo Todo { get; set; } = null!;
    }
}
