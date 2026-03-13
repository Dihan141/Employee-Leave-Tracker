using backend.DTOs.Leave;

namespace backend.DTOs.Employee
{
    public class EmployeeResponseDto
    {
        public int Id { get; set; }

        public required string Name { get; set; }

        public required string Email { get; set; }

        public required string Role { get; set; }

        public int? TotalLeaves { get; set; }

        public int? RemainingLeaves { get; set; }

        public DateTime JoiningDate { get; set; }
        public List<LeaveResponseDto> Leaves { get; set; } = new List<LeaveResponseDto>();
    }
}