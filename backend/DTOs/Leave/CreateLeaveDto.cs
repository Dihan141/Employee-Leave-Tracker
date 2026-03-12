namespace backend.DTOs.Leave
{
    public class CreateLeaveDto
    {
        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string Reason { get; set; } = String.Empty;
    }
}