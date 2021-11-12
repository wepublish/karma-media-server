# karma-media-server

## Development

### Using docker
```
docker-compose run --rm media yarn install
docker-compose up
```
Manual upload test
```
curl $(docker-compose port media 4001) -X POST -H "Authorization: Bearer secret" -F file=@package.json
```

### Local node
```
yarn install
yarn setup
yarn watch
```

## Production docker image

Production docker image differs from dev one:
- has production NODE_ENV set
- has devDependencies removed 

Local build and upload test:
```
docker build . --target app-production --tag karma-media-server
docker run --rm -it -e TOKEN=secret -e STORAGE_PATH=.media --name karma-media-server-local -P karma-media-server
curl $(docker port karma-media-server-local 4001) -X POST -H "Authorization: Bearer secret" -F file=@package.json
```
