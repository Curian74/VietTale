using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using VietTale_Api.Database;
using VietTale_Api.Dtos;
using VietTale_Api.Dtos.Requests;
using VietTale_Api.Interfaces;
using VietTale_Api.Models;
using VietTale_Api.Utils;

namespace VietTale_Api.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<AppUser> _userManager;
        private readonly JwtTokenProvider _jwtTokenProvider;

        public AuthRepository(ApplicationDbContext context, UserManager<AppUser> userManager, JwtTokenProvider jwtTokenProvider)
        {
            _context = context;
            _userManager = userManager; 
            _jwtTokenProvider = jwtTokenProvider;
        }

        public async Task<AppUser?> FindUserByEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);

            return user;
        }

        public async Task<AppUser> FindUserByRefreshTokenAsync(Guid token)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.RefreshToken == token);

            return user ?? null;
        }

        public async Task<RefreshTokenDto> GetNewRefreshTokenAsync(Guid refreshToken)
        {
            var user = await FindUserByRefreshTokenAsync(refreshToken)
                ?? throw new KeyNotFoundException("User not found.");

            if (user.RefreshTokenExpiresOn < DateTime.UtcNow || refreshToken != user.RefreshToken)
            {
                throw new InvalidOperationException("Invalid or expire refresh token.");
            }

            var newRefreshToken = Guid.NewGuid();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiresOn = DateTime.Now.AddMinutes(30);

            await _context.SaveChangesAsync();

            var newAccessToken = await _jwtTokenProvider.CreateToken(user);

            var refreshTokenDto = new RefreshTokenDto
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            };

            return refreshTokenDto;
        }

        public async Task<bool> LoginAsync(LoginRequestDto dto)
        {
            var user = await FindUserByEmailAsync(dto.Email) ?? throw new KeyNotFoundException("Không tìm thấy người dùng!");

            var result = await _userManager.CheckPasswordAsync(user, dto.Password);

            return result;
        }

        public async Task UpdateRefreshToken(AppUser user, Guid refreshToken)
        {
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiresOn = DateTime.Now.AddDays(7);

            await _context.SaveChangesAsync();
        }

        public async Task<IdentityResult> RegisterAsync(RegisterRequestDto dto)
        {
            var existingUser = await FindUserByEmailAsync(dto.Email);

            if (existingUser != null)
            {
                throw new InvalidOperationException("Email này đã được sử dụng.");
            }

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
