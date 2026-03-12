namespace backend.DTOs.Employee
{
    public class UpdateEmployeeDto
    {
        public string? Name { get; set; }

        public string? Email { get; set; }

        public int? TotalLeaves { get; set; }
        public int? RemainingLeaves { get; set; }

        public string? Password { get; set; }
    }
}