# karma-media-server

## Development

### Setup
```
docker-compose run --rm media yarn install
docker-compose up
```

### Manual upload test
```
curl $(docker-compose port media 4001) -X POST -H "Authorization: Bearer super-secret" -F file=@package.json
```


## Production image

Each master build creates karma-media-server production image.
It differs from dev one:
- has production NODE_ENV set
- has devDependencies removed 

Manual production build and upload test:
```
docker build . --target app-production --tag karma-media-server
docker run --rm -it -e TOKEN=foo -e STORAGE_PATH=.media --name karma-media-server-local -P karma-media-server
curl $(docker port karma-media-server-local 4001) -X POST -H "Authorization: Bearer foo" -F file=@package.json
```
