# Poker Server

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

## Next TODO

- Create simple datastore to mock smart contract for faster development. Use Google Sheets design as a model.