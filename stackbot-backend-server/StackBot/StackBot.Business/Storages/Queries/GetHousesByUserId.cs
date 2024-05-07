using MediatR;
using Stackbot.DataAccess.Entities;
using StackBot.Business.Dtos.ItemDtos;
using StackBot.Business.Dtos.StorageDtos;
using StackBot.Business.Interfaces;
using System.Diagnostics.Contracts;

namespace StackBot.Business.Storages.Queries
{
    public record GetHousesByUserId(Guid Id) : IRequest<ICollection<StorageResponseDto>>;

    public class GetHousesByUserIdHandler : IRequestHandler<GetHousesByUserId, ICollection<StorageResponseDto>>
    {
        private readonly IStorageRepository _storageRepository;

        public GetHousesByUserIdHandler(IStorageRepository storageRepository)
        {
            _storageRepository = storageRepository;
        }

        public async Task<ICollection<StorageResponseDto>> Handle(GetHousesByUserId request, CancellationToken cancellationToken)
        {
            var storages = await _storageRepository.GetHousesByUserId(request.Id);

            if (storages == null || storages.Count == 0)
            {
                throw new ApplicationException("There were no storages found!");
            }

            var storageDtos = new List<StorageResponseDto>();

            foreach (var storage in storages)
            {
                storageDtos.Add(StorageResponseDto.FromStorage(storage));
            }

            return storageDtos;
        }
    }
}
