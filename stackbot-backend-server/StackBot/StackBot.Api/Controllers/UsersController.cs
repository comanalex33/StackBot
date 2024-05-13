﻿using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StackBot.Api.Extensions;
using StackBot.Api.Models;
using StackBot.Business.Dtos.UserDtos;
using StackBot.Business.Users.Commands;
using StackBot.Business.Users.Queries;

namespace StackBot.Api.Controllers
{
    [ApiController]
    [Route("api/users")]
    public class UsersController : ControllerBase
    {
        private readonly IMediator _mediator;

        public UsersController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterUserDto user)
        {
            var command = new RegisterUser(user);
            var response = await _mediator.Send(command);

            var authenticationResult = new AuthenticationResult()
            {
                Token = response
            };
            return Ok(authenticationResult);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginUserDto userInfo)
        {
            var command = new LoginUser(userInfo);
            var response = await _mediator.Send(command);

            var authenticationResult = new AuthenticationResult()
            {
                Token = response
            };
            return Ok(authenticationResult);
        }

        [HttpGet]
        [Route("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var query = new GetUserById(id);
            var response = await _mediator.Send(query);

            return Ok(response);
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        public async Task<IActionResult> DeleteUser()
        {
            var userId = HttpContext.GetUserIdClaimValue();

            var command = new DeleteUser(userId);
            await _mediator.Send(command);

            return NoContent();
        }
    }
}
