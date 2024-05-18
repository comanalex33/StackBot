FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-dev
WORKDIR /app

COPY . ./
RUN dotnet restore StackBot.sln
RUN dotnet publish StackBot.Api/StackBot.Api.csproj -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build-dev /app/out .

ENTRYPOINT ["dotnet", "StackBot.Api.dll", "--migrate"]
