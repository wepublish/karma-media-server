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
