using backend.DTOs.Auth;
using backend.Helpers;
using backend.Interfaces.Repositories;
using backend.Interfaces.Services;
using backend.Models;

namespace backend.Services
{
    public class AuthService : IAuthService
    {
        private readonly IEmployeeRepository _employeeRepo;
        private readonly IConfiguration _config;

        public AuthService(IEmployeeRepository employeeRepo, IConfiguration config)
        {
            _employeeRepo = employeeRepo;
            _config = config;
        }

        public async Task CreateAdmin(CreateAdminDto dto)
        {
            var employees = await _employeeRepo.GetAllAsync();

            if (employees.Any(e => e.Role == "admin"))
            {
                throw new Exception("Admin already exists");
            }

            var admin = new Employee
            {
                Name = dto.Name,
                Email = dto.Email,
                Password = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "admin",
                JoiningDate = DateTime.UtcNow
            };

            await _employeeRepo.AddAsync(admin);
        }

        public async Task<string> Login(LoginDto dto)
        {
            var employee = await _employeeRepo.GetByEmailAsync(dto.Email);

            if (employee == null)
                throw new Exception("Invalid credentials");

            bool valid = BCrypt.Net.BCrypt.Verify(dto.Password, employee.Password);

            if (!valid)
                throw new Exception("Invalid credentials");

            // Generate JWT
            return JwtHelper.GenerateToken(employee, _config);
        }
    }
}