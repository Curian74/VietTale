using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VietTale_Api.Dtos.Requests;
using VietTale_Api.Dtos.Responses;
using VietTale_Api.Interfaces;
using VietTale_Api.Repositories;
using VietTale_Api.Utils;

namespace VietTale_Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepository;
        private readonly JwtTokenProvider _jwtTokenProvider;

        public AuthController(IAuthRepository authRepository, JwtTokenProvider jwtTokenProvider)
        {
            _authRepository = authRepository;
            _jwtTokenProvider = jwtTokenProvider;
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginRequestDto dto)
        {
            try
            {
                var result = await _authRepository.LoginAsync(dto);

                if (!result)
                {
                    return BadRequest("Invalid Credentials.");
                }

                var user = await _authRepository.FindUserByEmailAsync(dto.Email);

                var jwtToken = await _jwtTokenProvider.CreateToken(user);

                return Ok(new LoginResponseDto
                {
                    Email = dto.Email,
                    Token = jwtToken,
                });
            }

            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }

            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Register(RegisterRequestDto dto)
        {
            var result = await _authRepository.RegisterAsync(dto);

            return Ok(result);
        }
    }
}
