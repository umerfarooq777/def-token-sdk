
const defTokenSdk = require('def-token-sdk');
require('dotenv').config();

const rpcUrl = process.env.RPC_URL;
const privateKey = process.env.PRIVATE_KEY;


async function test() {
    try {
        // console.log(rpcUrl, privateKey);
        const defTokenSdkInstance = new defTokenSdk(rpcUrl, privateKey);
        // const { getParseEther, getContract,getMyBalance } = new defTokenSdk(rpcUrl, privateKey);

        const recipientAddress = "0xf3545A1eaD63eD1A6d8b6E63d68D937cdBf1aeE4"

        //!=== working fine
        const balance = await defTokenSdkInstance.getMyBalance();
        console.log('Balance =>', balance);

        //!=== working fine
        // const currentChain = await defTokenSdkInstance.getCurrentChain();
        // console.log('Current Chain =>', currentChain.toJSON());

        //!=== working fine
        // const query =
        //     `
        //     {
        //         approvals(first: 5) {
        //           id
        //           owner
        //           spender
        //           value
        //         }
        //         liquidityAddeds(first: 5) {
        //           id
        //           _from
        //           _mintedLiquidity
        //           _time
        //         }
        //       }
        //       `;
        // const eventsData = await defTokenSdkInstance.getTokenEvents(query);
        // console.log('Events =>', eventsData);


        //!== hee
        const defContract = await defTokenSdkInstance.getContract();
        const ownerAddress = await defContract.owner();
        const contractAddress = await defContract.getAddress();
        console.log('getContract =>', ownerAddress);
        // console.log('getContract =>', await defContract.UNISWAP_V2_ROUTER());
        // console.log('getContract =>', await defContract.FACTORY());
        // console.log('getContract =>', await defContract.WETH_ADDRESS());
        // console.log('getContract =>', await defContract.burnPercentage());
        console.log('getContract =>', await defContract.taxPercentage());
        // console.log('getContract =>', await defContract.symbol());
        // console.log('getContract =>', await defContract.name());
        // console.log('getContract =>', await defContract.decimals());
        // console.log('getContract =>', await defContract.totalSupply());
        // console.log('getContract =>', await defContract.getPoolAddress());
        // console.log('getContract =>', await defContract.getPoolReserves());
        // console.log('getContract =>', await defContract.getLPTokens(ownerAddress));
        // console.log('getContract =>', await defContract.addressIsExcluded(ownerAddress));


        // console.log('getContract =>', await defContract.getPoolReserves());
        // console.log('getContract =>', await defContract.addressIsExcluded(ownerAddress));

        console.log('getContract =>', contractAddress);
        console.log('getContract =>', await defTokenSdkInstance.getFormateEther(await defContract.allowance(ownerAddress, contractAddress)));
        // const Transaction0 = await defContract.approve(contractAddress, await defTokenSdkInstance.getParseEther(3500));
        // const Transaction0 = await defContract.ApproveMaxTokens();

        const Transaction0 = await defTokenSdkInstance.checkAddressIsTaxFree("0x808f0597D8B83189ED43d61d40064195F71C0D15");
        console.log(Transaction0);
        // const Transaction0 = await defTokenSdkInstance.ApproveMaxTokens();
        // console.log(Transaction0.hash);
        // const res = await Transaction0.wait();
        console.log('getContract =>', await defTokenSdkInstance.getFormateEther(await defContract.allowance(ownerAddress, contractAddress)));
        
        
        // console.log(res);

        // const Transaction = await defContract.setTaxPercentage('5');
        // const TransactionRec = await Transaction.wait();
        // console.log(TransactionRec);

        // await defContract.setBurnPercentage(_newfee=0-25); //ownerFunc
        // await defContract.setIsTaxExcluded(["addresses","addresses"],true/false); //ownerFunc
        // await defContract.transfer(_to,_amount);
        // await defContract.transferFrom(_from,_to,_amount);
        // await defContract.addLiquidityETHToPool(_amount,{value:"in wei"});
        // await defContract.removeLiquidityETHToPool(_LP_amount);
        // await defContract.withDrawTaxCollection(); //ownerFunc
        // await defContract.swapTokenWithEth(_tokenAmount); //ApproveMaxTokens first
        // await defContract.swapEthWithToken({value:"in wei"});

        // console.log('getContract =>', await defContract.taxPercentage());

    } catch (error) {
        console.error(error.message);
    }
}

test();
