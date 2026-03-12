using backend.DTOs.Employee;
using backend.Models;

namespace backend.Interfaces.Services
{
    public interface IEmployeeService
    {
        Task<List<Employee>> GetEmployees();

        Task<Employee?> GetEmployee(int id);

        Task<List<Employee>> GetEmployeesByRole(string role);

        Task CreateEmployee(CreateEmployeeDto dto);

        Task UpdateEmployee(int id, UpdateEmployeeDto dto);

        Task DeleteEmployee(int id);
    }
}