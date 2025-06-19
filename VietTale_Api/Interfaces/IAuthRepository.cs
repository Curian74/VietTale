using Microsoft.AspNetCore.Identity;
using VietTale_Api.Dtos.Requests;
using VietTale_Api.Models;

namespace VietTale_Api.Interfaces
{
    public interface IAuthRepository
    {
        Task<bool> LoginAsync(LoginRequestDto dto);
        Task<IdentityResult> RegisterAsync(RegisterRequestDto dto);
        Task<AppUser?> FindUserByEmailAsync(string email);
    }
}
