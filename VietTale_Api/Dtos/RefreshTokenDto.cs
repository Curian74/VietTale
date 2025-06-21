namespace VietTale_Api.Dtos
{
    public class RefreshTokenDto
    {
        public Guid RefreshToken { get; set; }
        public string? AccessToken { get; set; }
    }
}
