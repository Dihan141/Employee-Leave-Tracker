using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Leave
    {
        public int Id { get; set; }
        public int EmployeeId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Reason { get; set; } = String.Empty;
        public string Status { get; set; } = "Pending";
        public int Days { get; set; }
        public Employee? Employee { get; set; }
    }
}