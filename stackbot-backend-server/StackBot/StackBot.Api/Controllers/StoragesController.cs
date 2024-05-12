using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StackBot.Api.Extensions;
using StackBot.Business.Dtos.StorageDtos;
using StackBot.Business.Storages.Commands;
using StackBot.Business.Storages.Queries;

namespace StackBot.Api.Controllers
{
    [ApiController]
    [Route("api/storages")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class StoragesController : ControllerBase
    {
        private readonly IMediator _mediator;


        public StoragesController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost]
        public async Task<IActionResult> CreateStorage(CreateStorageDto createStorageDto)
        {
            var userId = HttpContext.GetUserIdClaimValue();

            var command = new CreateStorage(createStorageDto, userId);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [HttpDelete("{name}")]
        public async Task<IActionResult> DeleteStorage(string name, Guid? parentStorageId)
        {
            var command = new DeleteStorage(name, parentStorageId);
            await _mediator.Send(command);

            return NoContent();
        }

        [HttpGet("/houses/{userId}")]
        public async Task<IActionResult> GetHousesByUserId(Guid userId)
        {
            var command = new GetHousesByUserId(userId);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [HttpGet("/rooms/{houseId}")]
        public async Task<IActionResult> GetRoomsByHouseId(Guid houseId)
        {
            var command = new GetRoomsByHouseId(houseId);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [HttpGet("/substorages/{roomId}")]
        public async Task<IActionResult> GetSubStoragesByRoomId(Guid roomId)
        {
            var command = new GetSubStoragesByRoomId(roomId);
            var response = await _mediator.Send(command);

            return Ok(response);
        }

        [HttpPut("{name}")]
        public async Task<IActionResult> UpdateStorage(String name, UpdateStorageDto updateStorageDto)
        {
            var command = new UpdateStorage(name, updateStorageDto);
            var response = await _mediator.Send(command);

            return Ok(response);
        }
    }
}
