using backend.DTOs.Employee;
using backend.Models;

namespace backend.Interfaces.Services
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetEmployees();

        Task<EmployeeResponseDto?> GetEmployee(int id);

        Task<List<EmployeeResponseDto>> GetEmployeesByRole(string role);

        Task CreateEmployee(CreateEmployeeDto dto);

        Task UpdateEmployee(int id, UpdateEmployeeDto dto);

        Task DeleteEmployee(int id);
    }
}