namespace VietTale_Api.Dtos.Requests
{
    public class RegisterRequestDto
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string Username { get; set; } = null!;
        //public string ConfirmPassword { get; set; } = null!;
    }
}
