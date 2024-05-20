# Backend AI

## Using AI API

Available endpoints:

- `/process`
  - `POST` request
  - JSON data as an input, takes a `token` and a `text` and returns a `plain text` response

## Build AI

```sh
    docker build -t backend_ai:1.0 .
```

## Run Backend AI

```sh
    docker run -d -p 80:8443 --restart always --name backend_ai backend_ai:1.0
```

### Check server

The server should be running on `http://localhost:80` on the host machine.
