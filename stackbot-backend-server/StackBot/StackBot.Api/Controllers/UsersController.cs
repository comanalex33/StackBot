using MediatR;
using Microsoft.AspNetCore.Mvc;
using StackBot.Business.Dtos.UserDtos;
using StackBot.Business.Users.Commands;

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
        public async Task<IActionResult> CreateUser(RegisterUserRequestDto user)
        {
            var command = new RegisterUser(user);
            var response = await _mediator.Send(command);

            return Ok(response);
        }
    }
}
