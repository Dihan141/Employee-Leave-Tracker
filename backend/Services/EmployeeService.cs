using backend.DTOs.Employee;
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

        public async Task<List<Employee>> GetEmployeesByRole(string role)
        {
            return await _employeeRepository.GetByRoleAsync(role);
        }

        public async Task<Employee?> GetEmployee(int id)
        {
            return await _employeeRepository.GetByIdAsync(id);
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


            if (!string.IsNullOrEmpty(dto.Password))
                employee.Password = BCrypt.Net.BCrypt.HashPassword(dto.Password);

            await _employeeRepository.UpdateAsync(employee);
        }
    }
}