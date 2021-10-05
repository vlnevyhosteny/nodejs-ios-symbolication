# nodejs-ios-symbolication

Simple Express.js app that can symbolicate iOS crash and produce message into SQS.

## Prerequisites

 - Mac enviroment
 - Node@14
 - yarn
 - Docker
 - **!Important** XCode
## How to run

1. First you have to run `$ docker-compose up -d` to spin up dummy SQS.
2. If needed you can change [default config](./config.js)
3. Run app `$ node index.js`

Than you can call GET request on `localhost:3000/symbolicate` like:

```{shell}
## Request
curl "http://localhost:3000/symbolicate"
```

You should get 200 response and symbolicated crash in response body.

Also there should message created in SQS which you can view using [SQS-insight](http://localhost:9325).
