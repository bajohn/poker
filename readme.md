# Poker Server

## Next TODO

- Finish front end hand flow, now that we have valuation working!
    - In showdown, combination through all 7 choose 5 hands for each player, determining the best
    - Create test cases for clear winners 
- Next, deal with trickier cases
    - Split pots
    - Side pots
- (optional) check button - implement as bet of 0

## Hand values:
- Max number of kickers is 5
- Need two digits per kicker
- 10 digits total reserved for kickers
- Therefore
    - 1e0*(kicker 1 ) + 1e2*(kicker 2) + 1e4*(kicker 3)+ 1e6*(kicker 4)+ 1e8*(kicker 5)
    - 1e10 pair
    - 1e12 two pair (reserve four digits for high/low pair value)
    - 1e16 three of kind
    - 1e18 straight
    - 1e20 flush
    - 1e22 full house (reserve four digits for high/low triple/pair value)
    - 1e26 four of a kind
    - 1e28 straight flush

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

Run backend testing via
```
cd poker-be
npm run test
```

Run Cypress front end test via `ng run poker-fe:cypress-open` from `./poker-fe`
Note the backend server must be running for this to work.


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
