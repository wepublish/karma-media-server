# karma-media-server

## Development

### Using docker
```
docker-compose run --rm media yarn install
docker-compose up
```
Manual upload test
```
HOST=$(docker-compose port media 4001)
ID=$(curl $HOST -X POST -H "Authorization: Bearer secret" -F file=@package.json | jq -r .id)
curl $HOST/$ID
```

### Local node
```
yarn install
yarn setup
yarn watch
```

## Production docker image

Production image is being pushed on every new master commit as a `ghcr.io/wepublish/karma-media-server:latest`.

Production docker image differs from dev one:
- has production NODE_ENV set
- has devDependencies removed 

Local build and upload test:
```
docker build . --target app-production --tag karma-media-server
docker run --rm -it -e TOKEN=secret -e STORAGE_PATH=.media --name karma-media-server-local -P karma-media-server
curl $(docker port karma-media-server-local 4001) -X POST -H "Authorization: Bearer secret" -F file=@package.json
```
