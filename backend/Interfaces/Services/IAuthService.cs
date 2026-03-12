using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backend.DTOs.Auth;

namespace backend.Interfaces.Services
{
    public interface IAuthService
    {
        Task<string> Login(LoginDto dto);
        Task CreateAdmin(CreateAdminDto dto);
    }
}