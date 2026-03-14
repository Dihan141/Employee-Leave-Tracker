using backend.DTOs.Employee;
using backend.DTOs.Leave;
using backend.Interfaces.Repositories;
using backend.Interfaces.Services;
using backend.Models;

namespace backend.Services
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<List<Employee>> GetEmployees()
        {
            return await _employeeRepository.GetAllAsync();
        }

        public async Task<List<EmployeeResponseDto>> GetEmployeesByRole(string role)
        {
            var employees = await _employeeRepository.GetByRoleAsync(role);

            return employees.Select(employee => new EmployeeResponseDto
            {
                Id = employee.Id,
                Name = employee.Name,
                Email = employee.Email,
                Role = employee.Role,
                JoiningDate = employee.JoiningDate,
                TotalLeaves = employee.TotalLeaves,
                RemainingLeaves = employee.RemainingLeaves,
            }).ToList();
        }

        public async Task<EmployeeResponseDto?> GetEmployee(int id)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);

            if (employee == null)
                return null;

            return new EmployeeResponseDto
            {
                Id = employee.Id,
                Name = employee.Name,
                Email = employee.Email,
                Role = employee.Role,
                JoiningDate = employee.JoiningDate,
                TotalLeaves = employee.TotalLeaves,
                RemainingLeaves = employee.RemainingLeaves,
                Leaves = employee.Leaves.Select(l => new LeaveResponseDto
                {
                    Id = l.Id,
                    EmployeeId = l.EmployeeId,
                    EmployeeName = employee.Name,
                    StartDate = l.StartDate,
                    EndDate = l.EndDate,
                    Days = l.Days,
                    Reason = l.Reason,
                    Status = l.Status
                }).ToList()
            };
        }

        public async Task CreateEmployee(CreateEmployeeDto dto)
        {
            var existing = await _employeeRepository.GetByEmailAsync(dto.Email);

            if (existing != null)
                throw new Exception("Employee with this email already exists");

            var employee = new Employee
            {
                Name = dto.Name,
                Email = dto.Email,
                TotalLeaves = dto.TotalLeaves,
                RemainingLeaves = dto.TotalLeaves,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                JoiningDate = DateTime.UtcNow
            };

            await _employeeRepository.AddAsync(employee);
        }

        public async Task DeleteEmployee(int id)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);

            if (employee == null)
                throw new Exception("Employee not found");

            await _employeeRepository.DeleteAsync(id);
        }

        public async Task UpdateEmployee(int id, UpdateEmployeeDto dto)
        {
            var employee = await _employeeRepository.GetByIdAsync(id);

            if (employee == null)
                throw new Exception("Employee not found");

            // Update fields only if provided
            if (!string.IsNullOrEmpty(dto.Name))
                employee.Name = dto.Name;

            if (!string.IsNullOrEmpty(dto.Email))
                employee.Email = dto.Email;

            if (dto.TotalLeaves.HasValue)
                employee.TotalLeaves = dto.TotalLeaves.Value;

            if (dto.RemainingLeaves.HasValue)
            {
                if (dto.TotalLeaves.HasValue)
                {
                    if (dto.TotalLeaves < dto.RemainingLeaves)
                    {
                        throw new Exception("Remaining leaves can not be greater than total leaves");
                    }
                }
                employee.RemainingLeaves = dto.RemainingLeaves.Value;
            }


            if (!string.IsNullOrEmpty(dto.Password))
                employee.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            await _employeeRepository.UpdateAsync(employee);
        }
    }
}