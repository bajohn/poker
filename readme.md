# Poker Server

## Next TODO
- Testing via `ng test` using Jasmine/Karma was not ideal since we're trying to do e2e tests. Jasmine/Karma expects the backend to be mocked and seems to be more aimed at unit testing components (in isolation).
- Tried using `ng e2e` which should've been better for integration testing including the running server. BUT Protractor doesn't have the best `--watch` detection and fast iterations, and apparently is being deprecated by the Angular team?
- Try cypress - this repo has a schamatic for `ng`  https://github.com/briebug/cypress-schematic

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
