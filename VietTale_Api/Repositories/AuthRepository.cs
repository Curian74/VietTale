using Microsoft.AspNetCore.Identity;
using VietTale_Api.Database;
using VietTale_Api.Dtos.Requests;
using VietTale_Api.Interfaces;
using VietTale_Api.Models;

namespace VietTale_Api.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;

        public AuthRepository(ApplicationDbContext context, UserManager<AppUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<AppUser?> FindUserByEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            return user;
        }

        public async Task<bool> LoginAsync(LoginRequestDto dto)
        {
            var user = await FindUserByEmailAsync(dto.Email) ?? throw new KeyNotFoundException("User not found.");

            var result = await _userManager.CheckPasswordAsync(user, dto.Password);

            return result;
        }

        public async Task<IdentityResult> RegisterAsync(RegisterRequestDto dto)
        {
            var newUser = new AppUser
            {
                Email = dto.Email,
                UserName = dto.Username,
            };

            var result = await _userManager.CreateAsync(newUser, dto.Password);

            if (result.Succeeded)
            {
                await _userManager.AddToRoleAsync(newUser, "Member");
            }

            await _context.SaveChangesAsync();
            return result;
        }
    }
}
