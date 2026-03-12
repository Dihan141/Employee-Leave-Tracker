namespace backend.DTOs.Auth
{
    public class CreateAdminDto
    {
        public required string Name { get; set; }

        public required string Email { get; set; }

        public required string Password { get; set; }
    }
}