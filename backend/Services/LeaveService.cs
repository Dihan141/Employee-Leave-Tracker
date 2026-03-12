using backend.DTOs.Leave;
using backend.Interfaces.Repositories;
using backend.Interfaces.Services;
using backend.Models;

namespace backend.Services
{
    public class LeaveService : ILeaveService
    {
        private readonly ILeaveRepository _leaveRepository;
        private readonly IEmployeeRepository _employeeRepository;

        public LeaveService(
            ILeaveRepository leaveRepository,
            IEmployeeRepository employeeRepository)
        {
            _leaveRepository = leaveRepository;
            _employeeRepository = employeeRepository;
        }

        public async Task ApplyLeave(int employeeId, CreateLeaveDto dto)
        {
            var employee = await _employeeRepository.GetByIdAsync(employeeId);

            if (employee == null)
                throw new Exception("Employee not found");

            int days = (dto.EndDate - dto.StartDate).Days + 1;

            if (days <= 0)
                throw new Exception("Invalid leave dates");

            if (employee.RemainingLeaves < days)
                throw new Exception("Insufficient leave balance");

            var leave = new Leave
            {
                EmployeeId = employeeId,
                StartDate = dto.StartDate,
                EndDate = dto.EndDate,
                Days = days,
                Reason = dto.Reason,
                Status = "Pending"
            };

            await _leaveRepository.AddAsync(leave);
        }

        public async Task<List<LeaveResponseDto>> GetEmployeeLeaves(int employeeId)
        {
            var leaves = await _leaveRepository.GetByEmployeeIdAsync(employeeId);

            return leaves.Select(l => new LeaveResponseDto
            {
                Id = l.Id,
                EmployeeId = l.EmployeeId,
                EmployeeName = l.Employee!.Name,
                StartDate = l.StartDate,
                EndDate = l.EndDate,
                Reason = l.Reason,
                Status = l.Status
            }).ToList();
        }

        public async Task<List<LeaveResponseDto>> GetAllLeaves()
        {
            var leaves = await _leaveRepository.GetAllAsync();

            return leaves.Select(l => new LeaveResponseDto
            {
                Id = l.Id,
                EmployeeId = l.EmployeeId,
                EmployeeName = l.Employee!.Name,
                StartDate = l.StartDate,
                EndDate = l.EndDate,
                Reason = l.Reason,
                Status = l.Status
            }).ToList();
        }

        public async Task ApproveLeave(int leaveId)
        {
            var leave = await _leaveRepository.GetByIdAsync(leaveId);

            if (leave == null)
                throw new Exception("Leave not found");

            if (leave.Status != "Pending")
                throw new Exception("Leave already processed");

            var employee = await _employeeRepository.GetByIdAsync(leave.EmployeeId);

            if (employee!.RemainingLeaves < leave.Days)
                throw new Exception("Employee does not have enough leave balance");

            employee.RemainingLeaves -= leave.Days;

            leave.Status = "Approved";

            await _employeeRepository.UpdateAsync(employee);
            await _leaveRepository.UpdateAsync(leave);
        }

        public async Task RejectLeave(int leaveId)
        {
            var leave = await _leaveRepository.GetByIdAsync(leaveId);

            if (leave == null)
                throw new Exception("Leave not found");

            if (leave.Status != "Pending")
                throw new Exception("Leave already processed");

            leave.Status = "Rejected";

            await _leaveRepository.UpdateAsync(leave);
        }

        public async Task CancelLeave(int leaveId, int employeeId)
        {
            var leave = await _leaveRepository.GetByIdAsync(leaveId);

            if (leave == null)
                throw new Exception("Leave not found");

            if (leave.EmployeeId != employeeId)
                throw new Exception("Unauthorized");

            if (leave.Status == "Approved")
            {
                var employee = await _employeeRepository.GetByIdAsync(employeeId);

                employee!.RemainingLeaves += leave.Days;

                await _employeeRepository.UpdateAsync(employee);
            }

            leave.Status = "Cancelled";

            await _leaveRepository.UpdateAsync(leave);
        }
    }
}