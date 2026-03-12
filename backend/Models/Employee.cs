using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Models
{
    public class Employee
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public string Role { get; set; } = "employee";
        public DateTime JoiningDate { get; set; }
        public List<Leave> Leaves { get; set; } = new List<Leave>();

        public int? TotalLeaves { get; set; }
        public int? RemainingLeaves { get; set; }
    }
}