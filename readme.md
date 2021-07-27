# Poker Server

## Next TODO
Flesh out `poker-fe/cypress/integration/spec.ts`
Run via `ng run poker-fe:cypress-open` from `./poker-fe`

- finish testing big blind raise explicit cases
- (optional) make the initial test setup automated (n players)
- (optional) check button - implement as bet of 0
- cypress test actually changing bet amounts

## Development
Run backend server via 
```
cd poker-be
npm run dev
```
Run frontend via 
```
cd poker-fe
ng serve
```
Set up local dynamodb via 
https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html
and run via
```
java -Djava.library.path=./DynamoDBLocal_libjar DynamoDBLocal.jar -sharedDb
```



Local development ports:
- http://localhost:4200 Angular app
- http://localhost:8080 Express server
- http://localhost:8000 DynamoDB
- http://localhost:7950 Elrond testnet
- ws://localhost:8080/socket.io Angular <-> Express Websocket


## Notes
There was a horrid conflict between Angular's default Karma/Jasmine npm versions, which use socketio v2. This was fixed by bumping the karma libraries to the following in poker-fe/package.json, allowing socketio v4 to be used:
```    
    "karma": "~6.3.0",
    "karma-chrome-launcher": "~3.1.0",
    "karma-coverage-istanbul-reporter": "~3.0.3",
    "karma-jasmine": "~4.0.1",
    "karma-jasmine-html-reporter": "~1.6.0",
    "karma-safari-launcher": "~1.0.0",
```

Due to Protractor being deprecated by the Angular team and Karma/Jasmine not playing nicely with socketio, we've moved to Cypress.

Installed via 

```
ng run poker-fe:cypress-open
```
