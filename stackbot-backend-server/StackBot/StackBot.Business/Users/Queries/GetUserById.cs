using AutoMapper;
using MediatR;
using StackBot.Business.Dtos.UserDtos;
using StackBot.Business.Interfaces;

namespace StackBot.Business.Users.Queries
{
    public record GetUserById(Guid id) : IRequest<UserResponseDto>;

    public class GetUserByIdHandler : IRequestHandler<GetUserById, UserResponseDto>
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public GetUserByIdHandler(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<UserResponseDto> Handle(GetUserById request, CancellationToken cancellationToken)
        {
            var user = await _userRepository.GetUserById(request.id);

            return _mapper.Map<UserResponseDto>(user);
        }
    }
}
