using AutoMapper;
using MediatR;
using StackBot.Business.Dtos.StorageDtos;
using StackBot.Business.Interfaces;

namespace StackBot.Business.Storages.Queries
{
    public record GetHousesByUserId(Guid Id) : IRequest<ICollection<StorageResponseDto>>;

    public class GetHousesByUserIdHandler : IRequestHandler<GetHousesByUserId, ICollection<StorageResponseDto>>
    {
        private readonly IStorageRepository _storageRepository;
        private readonly IMapper _mapper;

        public GetHousesByUserIdHandler(IStorageRepository storageRepository, IMapper mapper)
        {
            _storageRepository = storageRepository;
            _mapper = mapper;
        }

        public async Task<ICollection<StorageResponseDto>> Handle(GetHousesByUserId request, CancellationToken cancellationToken)
        {
            var storages = await _storageRepository.GetHousesByUserId(request.Id);

            return _mapper.Map<ICollection<StorageResponseDto>>(storages);
        }
    }
}
