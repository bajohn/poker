import { Contract, ProxyProvider, BasicWallet, Wallet, parseQueryResult, ContractQueryResultDataType, TransactionOptions } from 'elrondjs'


const walletOpenHandler = (message: any) => {
    console.log('Opening wallet');
    const wallet = BasicWallet.fromJsonKeyFileString(message, 'password');
    contractInteract(wallet);
}

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

export {
    walletOpenHandler
};