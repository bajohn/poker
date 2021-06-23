# Poker Server

## Next TODO
- Cypress seems perfect. 

Flesh out `poker-fe/cypress/integration/spec.ts`
Run via `ng run poker-fe:cypress-open` from `./poker-fe`

- Figure out how to set random seeds for testing.
PROPOSITION:
- Create setSeed endpoint
- setSeed takes an argument of which series of hands to run 
For example, seed values determine a series of hands:
[
    // idx 0
    [
        [a0,a1,a2,...].
        [b0,b1,b2,...]
        ...
    ],
    // idx 1
    [
        [c0,c1,c2,...],
        [d0,d1,d2,...] 
    ],
    ...
]
- The series of hands is injected into game.ts to overwrite the RNG
- This endpoint is hit from either cypress itself (preferable?), or from the ng app running in test mode.
- Make sure this endpoint only works on local test mode! npm scripts should do this sufficiently.


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
