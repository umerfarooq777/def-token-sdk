
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
        async function getTokenToWei(_amount) {
                return defTokenSdkInstance.getParseEther(_amount.toString());
            
        }
        async function getWeiToToken(_amount) {
                return defTokenSdkInstance.getFormateEther(_amount.toString());
        }

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


        //!== READ
        const defContract = await defTokenSdkInstance.getContract();
        const ownerAddress = await defContract.owner();
        const contractAddress = await defContract.getAddress();
        // console.log('getContract =>', await defTokenSdkInstance.getContractDetails());




        //! WRITE

        //approves respective tokens to a spender
        // const Transaction0 = await defTokenSdkInstance.approveTokensTo(contractAddress,await getTokenToWei("333"));
        // const res = await Transaction0.wait();
        // console.log('getContract =>', await defTokenSdkInstance.getFormateEther(await defTokenSdkInstance.getTokenAllowance(ownerAddress, contractAddress)));
        
        //approves max tokens to def contract
        // const Transaction1 = await defTokenSdkInstance.ApproveMaxTokensToContract();
        // const res1 = await Transaction1.wait();
        // console.log('getContract =>', await defTokenSdkInstance.getFormateEther(await defTokenSdkInstance.getTokenAllowance(ownerAddress, contractAddress)));
        
        //set burn percentage by only owner 
        // console.log('getContract =>', (await defTokenSdkInstance.getContractDetails()).burnPercentage);
        // const Transaction1 = await defTokenSdkInstance.setNewBurnPercentage("2");
        // const res1 = await Transaction1.wait();
        // console.log('getContract =>', (await defTokenSdkInstance.getContractDetails()).burnPercentage);
        
        // set tax percentage by only owner 
        // console.log('getContract =>', (await defTokenSdkInstance.getContractDetails()).taxPercentage);
        // const Transaction1 = await defTokenSdkInstance.setNewTaxPercentage("8");
        // const res1 = await Transaction1.wait();
        // console.log('getContract =>', (await defTokenSdkInstance.getContractDetails()).taxPercentage);
        
        // set tax percentage by only owner 
        console.log('getContract =>', (await defTokenSdkInstance.getContractDetails()).taxPercentage);
        const Transaction1 = await defTokenSdkInstance.setNewTaxPercentage("8");
        const res1 = await Transaction1.wait();
        console.log('getContract =>', (await defTokenSdkInstance.getContractDetails()).taxPercentage);


    } catch (error) {
        console.error(error.message);
    }
}

test();
