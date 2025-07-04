﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data;
using VietTale_Api.Dtos;
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
        public async Task<IActionResult> RefreshToken([FromBody] GetRefreshTokenDto dto)
        {
            try
            {
                var result = await _authRepository.GetNewRefreshTokenAsync(dto.RefreshToken);

                return Ok(result);
            }

            catch (KeyNotFoundException ex)
            {
                return BadRequest(ex.Message);
            }

            catch (InvalidExpressionException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Login(LoginRequestDto dto)
        {
            try
            {
                var result = await _authRepository.LoginAsync(dto);

                if (!result)
                {
                    return BadRequest("Email hoặc mật khẩu không chính xác!");
                }

                var user = await _authRepository.FindUserByEmailAsync(dto.Email);

                var jwtToken = await _jwtTokenProvider.CreateToken(user);

                var refreshToken = _jwtTokenProvider.GenerateRefreshToken();

                await _authRepository.UpdateRefreshToken(user, refreshToken);

                return Ok(new LoginResponseDto
                {
                    Email = dto.Email,
                    Token = jwtToken,
                    RefreshToken = refreshToken
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
            try
            {
                var result = await _authRepository.RegisterAsync(dto);

                return Ok(result);
            }

            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Me([FromQuery] string email)
        {
            var user = await _authRepository.FindUserByEmailAsync(email);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
    }
}
