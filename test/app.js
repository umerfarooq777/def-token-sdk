
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

        //! === 1
        //approves respective tokens to a spender
        // const Transaction0 = await defTokenSdkInstance.approveTokensTo(contractAddress,await getTokenToWei("333"));
        // const res = await Transaction0.wait();
        // console.log('getContract =>', await defTokenSdkInstance.getFormateEther(await defTokenSdkInstance.getTokenAllowance(ownerAddress, contractAddress)));
        
        //! === 2
        //approves max tokens to def contract
        // const Transaction1 = await defTokenSdkInstance.ApproveMaxTokensToContract();
        // const res1 = await Transaction1.wait();
        // console.log('getContract =>', await defTokenSdkInstance.getFormateEther(await defTokenSdkInstance.getTokenAllowance(ownerAddress, contractAddress)));
        
        //! === 3
        //set burn percentage by only owner 
        // console.log('getContract =>', (await defTokenSdkInstance.getContractDetails()).burnPercentage);
        // const Transaction1 = await defTokenSdkInstance.setNewBurnPercentage("2");
        // const res1 = await Transaction1.wait();
        // console.log('getContract =>', (await defTokenSdkInstance.getContractDetails()).burnPercentage);
        
        //! === 4
        // set tax percentage by only owner 
        // console.log('getContract =>', (await defTokenSdkInstance.getContractDetails()).taxPercentage);
        // const Transaction1 = await defTokenSdkInstance.setNewTaxPercentage("8");
        // const res1 = await Transaction1.wait();
        // console.log('getContract =>', (await defTokenSdkInstance.getContractDetails()).taxPercentage);
        
        //! === 5
        // set tax percentage by only owner 
        // console.log('getContract =>', (await defTokenSdkInstance.getContractDetails()).taxPercentage);
        // const Transaction1 = await defTokenSdkInstance.setNewTaxPercentage("8");
        // const res1 = await Transaction1.wait();
        // console.log('getContract =>', (await defTokenSdkInstance.getContractDetails()).taxPercentage);
        
        //! === 6
        // set addresses as tax able or tax free by only owner 
        // const add1 = "0xf3545A1eaD63eD1A6d8b6E63d68D937cdBf1aeE4"
        // const add2 = "0x5cbD5063DdaE154c546860e2A4D2C16E2e1C786c"
        // const arrayOfAddresses = [add1,add2]
        // for (let index = 0; index < arrayOfAddresses.length; index++) {
        //     const userAddress = arrayOfAddresses[index];
        //     console.log('user',userAddress,"is tax free?", (await defTokenSdkInstance.checkAddressIsTaxFree(userAddress)));
        // } //before
        // const Transaction1 = await defTokenSdkInstance.updateTaxFreeAddressesAccess(arrayOfAddresses,false);
        // const res1 = await Transaction1.wait();
        // for (let index = 0; index < arrayOfAddresses.length; index++) {
            //     const userAddress = arrayOfAddresses[index];
            //     console.log('user',userAddress,"is tax free?", (await defTokenSdkInstance.checkAddressIsTaxFree(userAddress)));
            // } //after
            
        //! === 7
        //set new owner
        // const newOwnerAddress1 = "0x808f0597D8B83189ED43d61d40064195F71C0D15"
        // const newOwnerAddress2 = "0xf3545A1eaD63eD1A6d8b6E63d68D937cdBf1aeE4"
        // console.log(
        //     "current owner address",
        // (await defContract.owner())

        // );
        // const Transaction1 = await defTokenSdkInstance.transferContractOwnership(newOwnerAddress1);
        // const res1 = await Transaction1.wait();
        // console.log(
        //     "current owner address",
        // (await defContract.owner())

        // );

        //! === 8
        //get collected taxed token as eth
        // console.log("current contract Balance",(await defTokenSdkInstance.getETHBalanceOf(contractAddress)));
        // console.log("current contract Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(contractAddress)));
        // console.log("current owner Balance",(await defTokenSdkInstance.getETHBalanceOf(ownerAddress)));
        // console.log("current owner Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(ownerAddress)));

        // const Transaction1 = await defTokenSdkInstance.collectTaxedTokenAsEth();
        // const res1 = await Transaction1.wait();

        // console.log("current contract Balance",(await defTokenSdkInstance.getETHBalanceOf(contractAddress)));
        // console.log("current contract Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(contractAddress)));
        // console.log("current owner Balance",(await defTokenSdkInstance.getETHBalanceOf(ownerAddress)));
        // console.log("current owner Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(ownerAddress)));
        
        //! === 9
        //get swapped token with eth
        // const testAmount = await getTokenToWei("1.999999999999999997")
        // const userAddress = await defTokenSdkInstance.getSigner().getAddress();
        // console.log(testAmount,userAddress);
        // console.log("current userAddress Balance",(await defTokenSdkInstance.getETHBalanceOf(userAddress)));
        // console.log("current userAddress Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(userAddress)));
        // console.log("current userAddress Token Allowance",(await defTokenSdkInstance.getTokenAllowance(userAddress,contractAddress)));
        
        // const Transaction1 = await defTokenSdkInstance.swapTokenWithEth(testAmount.toString());
        // const res1 = await Transaction1.wait();
        
        // console.log("current userAddress Balance",(await defTokenSdkInstance.getETHBalanceOf(userAddress)));
        // console.log("current userAddress Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(userAddress)));
        // console.log("current userAddress Token Allowance",(await defTokenSdkInstance.getTokenAllowance(userAddress,contractAddress)));
        
        //! === 10
        //get swapped eth with def token
        // const ethWeiAmount = await getTokenToWei("0.00000001")
        // const userAddress = await defTokenSdkInstance.getSigner().getAddress();
        // console.log(ethWeiAmount,userAddress);
        // console.log("current userAddress Balance",(await defTokenSdkInstance.getETHBalanceOf(userAddress)));
        // console.log("current userAddress Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(userAddress)));
        
        // const Transaction1 = await defTokenSdkInstance.swapEthWithToken(ethWeiAmount.toString());
        // const res1 = await Transaction1.wait();
        
        // console.log("current userAddress Balance",(await defTokenSdkInstance.getETHBalanceOf(userAddress)));
        // console.log("current userAddress Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(userAddress)));
        
        //! === 11
        //transfer def token to an address
        // const tokenAmount = await getTokenToWei("500")
        // const userAddress = await defTokenSdkInstance.getSigner().getAddress();
        // const recipent = "0xf3545A1eaD63eD1A6d8b6E63d68D937cdBf1aeE4";
        // console.log(tokenAmount,userAddress);
        // console.log("current userAddress Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(userAddress)));
        // console.log("current recipent Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(recipent)));
        // const Transaction1 = await defTokenSdkInstance.transferDefToken(recipent,tokenAmount.toString());
        // const res1 = await Transaction1.wait();
        // console.log("current recipent Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(recipent)));
        
        //! === 12
        //transfer def token from an address to another address
        // const tokenAmount = await getTokenToWei("30")
        // const userAddress = await defTokenSdkInstance.getSigner().getAddress();
        // const fromAddress = "0xf3545A1eaD63eD1A6d8b6E63d68D937cdBf1aeE4";
        // const recipent = "0x5cbD5063DdaE154c546860e2A4D2C16E2e1C786c";
        // console.log(tokenAmount);
        // console.log("current fromAddress Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(fromAddress)));
        // console.log("current recipent Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(recipent)));
        // console.log("current userAddress Token Allowance",(await defTokenSdkInstance.getTokenAllowance(fromAddress,userAddress)));
        
        // //from address must give allowance to function caller
        // const Transaction1 = await defTokenSdkInstance.transferDefTokenFrom(fromAddress,recipent,tokenAmount.toString());
        // const res1 = await Transaction1.wait();

        // console.log("current fromAddress Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(fromAddress)));
        // console.log("current recipent Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(recipent)));
        // console.log("current userAddress Token Allowance",(await defTokenSdkInstance.getTokenAllowance(fromAddress,userAddress)));
        
        //! === 13
        //add liquidity eth with token
        // const tokenAmount = await getTokenToWei("200")
        // const ethAmount = await getTokenToWei("0.00002")
        // const userAddress = await defTokenSdkInstance.getSigner().getAddress();
        // console.log(tokenAmount);
        // console.log(ethAmount);
        // console.log("current userAddress Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(userAddress)));
        // console.log("current userAddress ETH Balance",(await defTokenSdkInstance.getETHBalanceOf(userAddress)));
        // console.log("current userAddress Token Allowance",(await defTokenSdkInstance.getTokenAllowance(userAddress,contractAddress)));
        // console.log("current userAddress LP Token Balance",(await defTokenSdkInstance.getLiquidityPoolTokensOf(userAddress)));
        
        // //caller account must give allowance to function contract address
        // const Transaction1 = await defTokenSdkInstance.addLiquidityETHToPool(tokenAmount.toString(),ethAmount.toString());
        // const res1 = await Transaction1.wait();
        
        // console.log("================================================ end of Transaction1================================");
        // console.log("current userAddress Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(userAddress)));
        // console.log("current userAddress ETH Balance",(await defTokenSdkInstance.getETHBalanceOf(userAddress)));
        // console.log("current userAddress Token Allowance",(await defTokenSdkInstance.getTokenAllowance(userAddress,contractAddress)));
        // console.log("current userAddress LP Token Balance",(await defTokenSdkInstance.getLiquidityPoolTokensOf(userAddress)));
        
        //! === 14
        // remove liquidity eth with token
        const lpTokenAmount = await getTokenToWei("0.000001")
        const userAddress = await defTokenSdkInstance.getSigner().getAddress();
        console.log("current userAddress Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(userAddress)));
        console.log("current userAddress ETH Balance",(await defTokenSdkInstance.getETHBalanceOf(userAddress)));
        console.log("current userAddress Token Allowance",(await defTokenSdkInstance.getTokenAllowance(userAddress,contractAddress)));
        console.log("current userAddress LP Token Balance",(await defTokenSdkInstance.getLiquidityPoolTokensOf(userAddress)));
        
        //caller account must give allowance to function contract address
        const Transaction1 = await defTokenSdkInstance.removeLiquidityETHToPool(lpTokenAmount.toString());
        const res1 = await Transaction1.wait();
        
        console.log("================================================ end of Transaction1================================");
        console.log("current userAddress Token Balance",(await defTokenSdkInstance.getTokenBalanceOfAddress(userAddress)));
        console.log("current userAddress ETH Balance",(await defTokenSdkInstance.getETHBalanceOf(userAddress)));
        console.log("current userAddress Token Allowance",(await defTokenSdkInstance.getTokenAllowance(userAddress,contractAddress)));
        console.log("current userAddress LP Token Balance",(await defTokenSdkInstance.getLiquidityPoolTokensOf(userAddress)));






    } catch (error) {
        console.error(error.message);
    }
}

test();
