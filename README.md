# karma-media-server

## Development

### Getting started local

```
yarn install
yarn setup
yarn watch
```

### Getting started with docker

If you want to develop with code-completion inside docker create following `docker-compose.override.yml`:
```
echo "services:
  media:
    volumes:
      - .:/home/node" > docker-compose.override.yml
```

Then run
```
mkdir -p .media
docker-compose run --rm media yarn install
docker-compose up
```

## Usage

Manual upload test
```
ID=$(curl localhost:4100 -X POST -H "Authorization: Bearer secret" -F file=@package.json | jq -r .id)
curl localhost:4100/$ID
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
curl $(docker port karma-media-server-local 4100) -X POST -H "Authorization: Bearer secret" -F file=@package.json
```
