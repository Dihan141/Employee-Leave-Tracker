using backend.DTOs.Auth;
using backend.Interfaces.Services;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var token = await _authService.Login(dto);

            return Ok(new { token });
        }

        // One-time admin creation
        [HttpPost("create-admin")]
        public async Task<IActionResult> CreateAdmin(CreateAdminDto dto)
        {
            try
            {
                await _authService.CreateAdmin(dto);

                return Ok(new
                {
                    message = "Admin created successfully"
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    message = ex.Message
                });


            }
        }
    }
}