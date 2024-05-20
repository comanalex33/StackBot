using MediatR;
using StackBot.Business.Interfaces;

namespace StackBot.Business.Storages.Commands
{
    public record AddUserToHouse(Guid OwnerId, Guid HouseId, string Email) : IRequest<Unit>;

    public class AddUserToHouseHandler : IRequestHandler<AddUserToHouse, Unit>
    {
        private readonly IUserRepository _userRepository;

        public AddUserToHouseHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<Unit> Handle(AddUserToHouse request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetUserByEmail(request.Email);

            await _userRepository.AddUserToStorage(request.OwnerId, request.HouseId, user.Id);

            return Unit.Value;
        }
    }
}
