# Backend

## Development

Use `Stackbot/Stackbot.sln` to open Solution in Visual Studio.

## Production

### Build docker image

```sh
docker build stackbot180/backend:1.0 .
```

### Run Backend in Docker container

`Prerequisites`: A `secrets.json` file is needed with the following format:

```json
{
  "DatabaseHost": "<database_host>",
  "DatabaseName": "<database_name>",
  "DatabaseUsername": "<database_user>",
  "DatabasePassword": "<database_password>"
}
```

Run docker container and expose the backend on port 80 on the host machine:

```sh
docker run -d -v /path/to/secrets.json:/app/secrets.json:rw --restart always -p 80:8080 --name server stackbot180/backend:1.0
```

Additional information:

- The `secrets.json` file need to be mounted to `/app/secrets.json`
- The `--restart always` option will automatically restart the app in case of failure
