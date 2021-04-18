import express from "express";
import { Contract, ProxyProvider, BasicWallet, Wallet, parseQueryResult, ContractQueryResultDataType, TransactionOptions } from 'elrondjs'


const app = express();


const http = require('http').Server(app);
let io = require("socket.io")(http);

// app.locals.io = getIOServer(http);
const port = 8080; // default port to listen

// define a route handler for the default home page
app.get("/", (req, res) => {
    res.send("Hello world!");
});

io.on("connection", (socket: any) => {
    // tslint:disable-next-line:no-console
    console.log("a user connected");
    // whenever we receive a 'message' we log it out
    socket.on("open-wallet", (message: any) => {
        const wallet = BasicWallet.fromJsonKeyFileString(message, 'password');

        console.log(wallet, message);
        contractInteract(wallet);
    });
});

// start the Express server
http.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${port}`);
});

const contractInteract = async (wallet: Wallet) => {
    const proxy = new ProxyProvider('http://localhost:7950');
    const contractAddress = 'erd1qqqqqqqqqqqqqpgqfzydqmdw7m2vazsp6u5p95yxz76t2p9rd8ss0zp9ts';
    const c = await Contract.at(contractAddress, {
        provider: proxy,
        signer: wallet,
        sender: wallet.address(),
    });
    const plyrCnt = await c.query('playerCount');
    const plyrCntParsed = parseQueryResult(plyrCnt, { type: ContractQueryResultDataType.INT });
    console.log('Player Count', plyrCntParsed);

    const dealer = await c.query('getDealer');
    const dealerParsed = parseQueryResult(dealer, { type: ContractQueryResultDataType.ADDRESS });
    console.log('Dealer', dealerParsed);

    const options: TransactionOptions = {
        gasLimit: 50000000,
    };
    const joinResp = await c.invoke('join', [], options);
    console.log('join', joinResp);

}