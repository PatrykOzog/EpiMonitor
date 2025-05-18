# Epidemiological Survey App

The complete project consists of three components:

- `database` – a PostgreSQL container running in Docker
- `server` – backend built with Express (TypeScript)
- `client` – frontend built with React (TypeScript)

## Database configuration:

> docker run --name my-postgres \
>  -e POSTGRES_USER=myuser \
>  -e POSTGRES_PASSWORD=mypassword \
>  -e POSTGRES_DB=myapp \
>  -p 5432:5432 \
>  -d postgres

docker start my-postgres

Then in order to modify and write queries:

> docker exec -it my-postgres psql -U myuser -d myapp

## Server configuration:

Make sure the server configuration is correct (port etc...), then

> cd .\server\
> npm run dev

## Client configuration:

> cd .\client\
> npm run start
