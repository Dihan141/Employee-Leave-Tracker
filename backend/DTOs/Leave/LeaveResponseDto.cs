namespace backend.DTOs.Leave
{
    public class LeaveResponseDto
    {
        public int Id { get; set; }

        public int EmployeeId { get; set; }

        public required string EmployeeName { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string Reason { get; set; } = String.Empty;

        public required string Status { get; set; }
    }
}