using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StackBot.Api.Extensions;
using StackBot.Business.Dtos.ItemDtos;
using StackBot.Business.Items.Commands;
using StackBot.Business.Items.Queries;

namespace StackBot.Api.Controllers
{
    [ApiController]
    [Route("api/items")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ItemsController : ControllerBase
    {
        private readonly IMediator _mediator;

        public ItemsController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem(CreateItemDto createItemDto)
        {
            var userId = HttpContext.GetUserIdClaimValue();

            var command = new CreateItem(userId, createItemDto);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [HttpDelete("{itemName}")]
        public async Task<IActionResult> DeleteItem(string itemName)
        {
            var command = new DeleteItem(itemName);
            await _mediator.Send(command);

            return NoContent();
        }

        [HttpGet("{itemName}")]
        public async Task<IActionResult> GetItemsContainingName(string itemName)
        {
            var command = new GetItemsContainingName(itemName);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [HttpPut("{name}")]
        public async Task<IActionResult> UpdateItem(string name, UpdateItemDto updateItemDto)
        {
            var command = new UpdateItem(name, updateItemDto);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

    }
}
