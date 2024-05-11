using MediatR;
using StackBot.Business.Dtos.UserDtos;
using StackBot.Business.Interfaces;

namespace StackBot.Business.Users.Queries
{
    public record GetUserById(Guid id) : IRequest<UserResponseDto>;

    public class GetUserByIdHandler : IRequestHandler<GetUserById, UserResponseDto>
    {
        private readonly IUserRepository _userRepository;

        public GetUserByIdHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task<UserResponseDto> Handle(GetUserById request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetUserById(request.id);

            return UserResponseDto.FromUser(user);
        }
    }
}
