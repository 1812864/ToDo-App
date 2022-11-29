using System;
using System.Collections.Generic;

namespace core_API.Models
{
    public partial class Element
    {
        public Guid Id { get; set; }
        public Guid TodoId { get; set; }
        public Guid? ParentId { get; set; }
        public string? ElementName { get; set; }
        public string? Description { get; set; }
        public DateTime? DueDate { get; set; }
        public DateTime? CreateTime { get; set; }
        public DateTime? LastUpdate { get; set; }

        public virtual Todo Todo { get; set; } = null!;
    }
}
