using backend.Data;
using backend.Interfaces.Repositories;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Repositories
{
    public class LeaveRepository : ILeaveRepository
    {
        private readonly AppDbContext _context;

        public LeaveRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Leave>> GetAllAsync()
        {
            return await _context.Leaves
                .Include(l => l.Employee)
                .ToListAsync();
        }

        public async Task<List<Leave>> GetByEmployeeIdAsync(int employeeId)
        {
            return await _context.Leaves
                .Where(l => l.EmployeeId == employeeId)
                .Include(l => l.Employee)
                .ToListAsync();
        }

        public async Task<Leave?> GetByIdAsync(int id)
        {
            return await _context.Leaves
                .Include(l => l.Employee)
                .FirstOrDefaultAsync(l => l.Id == id);
        }

        public async Task AddAsync(Leave leave)
        {
            await _context.Leaves.AddAsync(leave);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Leave leave)
        {
            _context.Leaves.Update(leave);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var leave = await _context.Leaves.FindAsync(id);

            if (leave != null)
            {
                _context.Leaves.Remove(leave);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<Leave>> GetEmployeesCurrentlyOnLeaveAsync()
        {
            var today = DateTime.Today;

            return await _context.Leaves
                .Include(l => l.Employee)
                .Where(l => l.Status == "Approved" &&
                            l.StartDate.Date <= today &&
                            l.EndDate.Date >= today)
                .ToListAsync();
        }

        public async Task<bool> HasOverlappingLeaveAsync(int employeeId, DateTime startDate, DateTime endDate)
        {
            return await _context.Leaves.AnyAsync(l =>
                l.EmployeeId == employeeId &&
                l.Status != "Rejected" &&
                l.Status != "Cancelled" &&
                startDate <= l.EndDate &&
                endDate >= l.StartDate
            );
        }
    }
}