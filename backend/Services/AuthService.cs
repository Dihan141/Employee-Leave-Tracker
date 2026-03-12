using backend.DTOs.Auth;
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

        public Task<string> Login(LoginDto dto)
        {
            throw new NotImplementedException();
        }
    }
}