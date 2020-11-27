# IPStack

API for geolocation based on IP/domain adress.

## Developed on:

-   nodejs v14
-   npm v6

## Running

### Node:
Development mode:

```
$ npm i
$ npm start:dev
```

Build:

```
$ npm i
$ npm build
```

### Docker:
```
$ docker build . -t ipstack
$ docker run -d --env-file dev.env -p [localMachinePortToListen]:1337 ipstack:latest
```


## Built With

- MarbleJS
- MongoDB with Mongoose
- TypeScript

## API

[API DOCS](./API.md)

## Authors

-   **Kamil Zieliński** - [kamilzielinskidev](https://github.com/kamilzielinskidev)
