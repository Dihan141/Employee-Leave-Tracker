using backend.DTOs.Leave;

namespace backend.Interfaces.Services
{
    public interface ILeaveService
    {
        Task ApplyLeave(int employeeId, CreateLeaveDto dto);

        Task<List<LeaveResponseDto>> GetEmployeeLeaves(int employeeId);

        Task<List<LeaveResponseDto>> GetAllLeaves();

        Task ApproveLeave(int leaveId);

        Task RejectLeave(int leaveId);
        Task CancelLeave(int leaveId, int employeeId);
    }
}