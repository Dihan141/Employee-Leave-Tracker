using backend.Models;

namespace backend.Interfaces.Repositories
{
    public interface ILeaveRepository
    {
        Task<List<Leave>> GetAllAsync();

        Task<List<Leave>> GetByEmployeeIdAsync(int employeeId);

        Task<Leave?> GetByIdAsync(int id);

        Task<List<Leave>> GetEmployeesCurrentlyOnLeaveAsync();

        Task<bool> HasOverlappingLeaveAsync(int employeeId, DateTime startDate, DateTime endDate);

        Task AddAsync(Leave leave);

        Task UpdateAsync(Leave leave);

        Task DeleteAsync(int id);
    }
}