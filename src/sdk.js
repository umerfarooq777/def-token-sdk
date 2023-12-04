const { ethers } = require('ethers');
require('dotenv').config();
const axios = require('axios');
const ABI = require("./DefContractABI.json")
const testABI = require("./testABI.json")



class defTokenSDK {

    //! =============== SDK Construction
    constructor(rpcUrl, privateKey) {
        try {

            this.provider = new ethers.JsonRpcProvider(rpcUrl);
            this.wallet = new ethers.Wallet(privateKey, this.provider);

            // console.log(this.provider);
            // console.log(this.signer);
            // console.log(await this.signer.getAddress());
            // const address = await this.signer.getAddress();

            // const contractAddress = '0xA4DeF42d5dFB3833294DB7D9305ADF9d11d1E840'; //goerli 1st
            const contractAddress = '0xBFdEdA659797Ef1A567F9Dc650cBb3948B1432b7'; //goerli 2nd
            // const contractABI = ABI;

            // const contractAddress = '0x503BaFD30ab87B6497A262ED7dAD187bdC479170'; //hardhat test
            const contractABI = testABI;

            this.DefContract = new ethers.Contract(contractAddress, contractABI, this.wallet);

            // this.getContract();

        } catch (error) {
            throw new Error(`Error creating sdk: ${error.message}`);

        }
    }

    // isWholeNumber(str) {
    //     const num = Number(str);
    //     return !isNaN(num) && num % 1 !== 0;
    //   }


    async checkIsOwner() {
        const owner = await this.DefContract.owner();
        const msgSender = await this.wallet.getAddress();
        if (!(owner.toLowerCase()==msgSender.toLowerCase())) {
                
            throw new Error(`Only allowed for owner to execute`);
        }
       
      }

    //! =============== SDK Read Functions

    async getMyBalance() {
        try {
            const balance = await this.provider.getBalance(this.wallet.address);
            return ethers.formatEther(balance.toString());
        } catch (error) {
            throw new Error(`Error getting balance: ${error.message}`);
        }
    }

    async getParseEther(_amount) {
        try {
            return ethers.parseEther(_amount.toString());
        } catch (error) {
            throw new Error(`Error parsing ${_amount} : ${error.message}`);

        }
    }
    async getFormateEther(_amount) {
        try {
            return ethers.formatEther(_amount.toString());
        } catch (error) {
            throw new Error(`Error formating ${_amount} : ${error.message}`);
        }
    }

    async getTokenEvents(userQuery) {
        try {
            const APIURL =
                "https://api.studio.thegraph.com/query/57860/def-token/version/latest";
            const res = await axios
                .post(APIURL, {
                    query: userQuery,
                })
                .then((res) => {
                    const data = res.data.data;
                    // console.log(data);
                    return data;

                }).catch((error) => {
                    throw new Error(`Error getting events: ${error.message}`);
                });

            return res;

        } catch (error) {
            throw new Error(`Error getting events: ${error.message}`);
        }
    }

    async getCurrentChain() {
        try {
            const network = await this.provider.getNetwork();
            return network;
        } catch (error) {
            console.error('Error getting current chain:', error.message);
        }
    }

    async checkAddressIsTaxFree(addressToCheck) {
        try {

            let res = await this.DefContract.addressIsExcluded(addressToCheck);
            return res
        } catch (error) {
            console.error('Error checkAddressIsTaxFree :', error.message);
        }
    }


    async getContract() {
        try {
            return this.DefContract
        } catch (error) {
            throw new Error(`Error getting contract instance: ${error.message}`);
        }
    }


    async getContractDetails() {
        try {
            let details = {
                contractAddress: await this.DefContract.getAddress(),
                chain : await this.provider.getNetwork(),
                decimals: await this.DefContract.decimals(),
                burnPercentage: await this.DefContract.burnPercentage(),
                factoryAddress: await this.DefContract.FACTORY(),
                poolReserves: await this.DefContract.getPoolReserves(),
                poolAddress: await this.DefContract.getPoolAddress(),
                name: await this.DefContract.name(),
                owner: await this.DefContract.owner(),
                symbol: await this.DefContract.symbol(),
                taxPercentage: await this.DefContract.taxPercentage(),
                totalSupply: await this.DefContract.totalSupply(),
                routerAddress: await this.DefContract.UNISWAP_V2_ROUTER(),
                wethAddress: await this.DefContract.WETH_ADDRESS(),
            }




            return details
        } catch (error) {
            throw new Error(`Error getting getContractDetails: ${error.message}`);
        }
    }



    async getTokenBalanceOfAddress(address) {
        try {
            
            const balance = await this.DefContract.balanceOf(address);
            return balance;
        } catch (error) {
            throw new Error(`Error getting getTokenBalanceOfAddress: ${error.message}`);
        }
    }

    async getTokenAllowance(owner,spender) {
        try {
            
            const balance = await this.DefContract.allowance(owner,spender);
            return balance;
        } catch (error) {
            throw new Error(`Error getting getTokenAllowance: ${error.message}`);
        }
    }


    async getReceivingAmount(amountToSpent,tokenToSpent) {
        try {
            
            const balance = await this.DefContract.getInputAmount(amountToSpent,tokenToSpent);
            return balance;
        } catch (error) {
            throw new Error(`Error getting getReceivingAmount: ${error.message}`);
        }
    }

    async getSpendingAmount(amountToReceive,tokenToReceive) {
        try {
            
            const balance = await this.DefContract.getReturnAmount(amountToReceive,tokenToReceive);
            return balance;
        } catch (error) {
            throw new Error(`Error getting getSpendingAmount: ${error.message}`);
        }
    }


    async getLiquidityPoolTokensOf(providerAddress) {
        try {
            
            const balance = await this.DefContract.getLPTokens(providerAddress);
            return balance;
        } catch (error) {
            throw new Error(`Error getting getLiquidityPoolTokensOf: ${error.message}`);
        }
    }


    //! =============== SDK Write Functions

    async ApproveMaxTokensToContract() {
        try {
        let res = await this.DefContract.ApproveMaxTokens();
            return res
        } catch (error) {
            throw new Error(`Error approving max tokens instance: ${error.message}`);
        }
    }

    async approveTokensTo(spenderAddress,amount) {
        try {
        let res = await this.DefContract.approve(spenderAddress,amount);
            return res
        } catch (error) {
            throw new Error(`Error approving max tokens instance: ${error.message}`);
        }
    }


    async setNewBurnPercentage(_percentage) {
        try {
            
            await this.checkIsOwner();
            

            //! added later
            // if (!this.isWholeNumber(_percentage)){
            //     throw new Error(`Please set percentage ${_percentage} as a whole number `);
            // }
            


            if (!(Number(_percentage)>=1&&Number(_percentage)<=250)){
                throw new Error(`Please set percentage ${_percentage} between 1 for 0.1% and 250 for 25%`);
            }
            
            const burnPercentage = (await this.DefContract.burnPercentage()).toString()


            if (burnPercentage===_percentage){
                throw new Error(`Please set a new percentage ${_percentage},can't be same as old`);
            }


        let res = await this.DefContract.setBurnPercentage(_percentage);
            return res
        } catch (error) {
            throw new Error(`Error setNewBurnPercentage: ${error.message}`);
        }
    }

    async setNewTaxPercentage(_percentage) {
        try {
            
            await this.checkIsOwner();
            

            //! added later
            // if (!this.isWholeNumber(_percentage)){
            //     throw new Error(`Please set percentage ${_percentage} as a whole number `);
            // }
            


            if (!(Number(_percentage)>=1&&Number(_percentage)<=250)){
                throw new Error(`Please set percentage ${_percentage} between 1 for 0.1% and 250 for 25%`);
            }
            
            const taxPercentage = (await this.DefContract.taxPercentage()).toString()


            if (taxPercentage===_percentage){
                throw new Error(`Please set a new percentage ${_percentage},can't be same as old`);
            }


        let res = await this.DefContract.setTaxPercentage(_percentage);
            return res
        } catch (error) {
            throw new Error(`Error setNewTaxPercentage: ${error.message}`);
        }
    }


    async updateTaxFreeAddressesAccess(_addresses, _hasAccess) {
        try {
            
            await this.checkIsOwner();


        let res = await this.DefContract.setIsTaxExcluded(_addresses, _hasAccess);
            return res
        } catch (error) {
            throw new Error(`Error setNewTaxPercentage: ${error.message}`);
        }
    }
}

module.exports = defTokenSDK;
