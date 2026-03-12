namespace backend.DTOs.Employee
{
    public class CreateEmployeeDto
    {
        public required string Name { get; set; }

        public required string Email { get; set; }

        public required string Password { get; set; }
    }
}