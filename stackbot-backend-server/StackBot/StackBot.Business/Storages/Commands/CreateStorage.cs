using AutoMapper;
using MediatR;
using StackBot.Business.Dtos.StorageDtos;
using StackBot.Business.Interfaces;
using StackBot.Domain.Entities;

namespace StackBot.Business.Storages.Commands
{
    public record CreateStorage(CreateStorageDto createStorageRequestDto, Guid userId) : IRequest<StorageResponseDto>;

    public class CreateStorageHandler : IRequestHandler<CreateStorage, StorageResponseDto>
    {
        private readonly IStorageRepository _storageRepository;
        private readonly IMapper _mapper;

        public CreateStorageHandler(IStorageRepository storageRepository, IMapper mapper)
        {
            _storageRepository = storageRepository;
            _mapper = mapper;
        }

        public async Task<StorageResponseDto> Handle(CreateStorage request, CancellationToken cancellationToken)
        {
            var storage = new Storage
            {
                Name = request.createStorageRequestDto.Name,
                Type = request.createStorageRequestDto.Type,
                Description = request.createStorageRequestDto.Description
            };

            var storageParent = await _storageRepository.GetStorageByName(request.createStorageRequestDto.ParentStorageName);
            if (storageParent != null)
            {
                storage.ParentStorageId = storageParent.Id;

            }

            await _storageRepository.CreateStorage(storage, request.userId);

            return _mapper.Map<StorageResponseDto>(storage);
        }
    }
}
