const { ethers} = require('ethers');
const BigNumber = require('bignumber.js');

require('dotenv').config();
const axios = require('axios');
const ABI = require("./DefContractABI.json")
const testABI = require("./testABI.json")
const poolABI = require("./poolABI.json")



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

    getSigner() {
        return this.wallet
      }


    async checkIsOwner() {
        const owner = await this.DefContract.owner();
        const msgSender = await this.wallet.getAddress();
        if (!(owner.toLowerCase()==msgSender.toLowerCase())) {
                
            throw new Error(`Only allowed for owner to execute`);
        }
       
      }

    async validateUserTokenAllowance(amount,_ownerAddress,_spenderAddress) {
            if ((_ownerAddress&&!_spenderAddress) || (_spenderAddress && !_ownerAddress)){

                throw new Error(`Please provide owner and spender address`);
            }
            
            if (Number(amount)<=0) {
                
                throw new Error(`amount (${amount}) must be greater than 0 `);
            }

            // console.log(await this.wallet.getAddress(),await this.DefContract.getAddress());
            const userAllowanceToContract = await this.getTokenAllowance( _ownerAddress|| await this.wallet.getAddress(),_spenderAddress||await this.DefContract.getAddress());
            
            const amountToSwap = BigNumber(amount.toString());
            const userFormattedAllowance = BigNumber(userAllowanceToContract.toString());
            
            const isAllowanceGreaterOrEqual = userFormattedAllowance.gte(amountToSwap);
      
            if (!isAllowanceGreaterOrEqual) {
                throw new Error(`Insufficient token allowance : current allowance (${userAllowanceToContract.toString()}) `)
            }

        
       
      }


    async validateUserLPTokenAmount(amount) {
 
        
        //!== to be added 
           if (Number(amount)<=0) {
                
                throw new Error(`amount (${amount}) must be greater than 0 `);
            }

            const poolAddress =  await this.DefContract.getPoolAddress(); 
            const poolContractABI = poolABI;
            const poolContract = new ethers.Contract(poolAddress, poolContractABI, this.wallet);

            const userLPBalance = await poolContract.balanceOf(this.wallet.address);
            
            const amountToRemove = new BigNumber(amount.toString());
            const userBalanceAvailable = new BigNumber(userLPBalance.toString());
            
            const isBalanceGreaterOrEqual = userBalanceAvailable.gte(amountToRemove); // userBalanceAvailable >= amountToRemove 
            
            if (!isBalanceGreaterOrEqual) {
                throw new Error(`Insufficient LP balance : user LP balance (${userLPBalance.toString()}) `)
            }
            
        
       console.log("done");
      }
    async validateUserLPTokenAllowance(amount) {
 
        
        //!== to be added 
           if (Number(amount)<=0) {
                
                throw new Error(`amount (${amount}) must be greater than 0 `);
            }

            const poolAddress =  await this.DefContract.getPoolAddress(); 
            const poolContractABI = poolABI;
            const poolContract = new ethers.Contract(poolAddress, poolContractABI, this.wallet);

            const userLPAllowance = await poolContract.allowance(await this.wallet.getAddress(),await this.DefContract.getAddress());
            
            const amountToRemove = new BigNumber(amount.toString());
            const userBalanceAvailable = new BigNumber(userLPAllowance.toString());
            
            const isBalanceGreaterOrEqual = userBalanceAvailable.gte(amountToRemove); // userBalanceAvailable >= amountToRemove 
            
            if (!isBalanceGreaterOrEqual) {
                throw new Error(`Insufficient LP allowance : user LP allowance (${userLPAllowance.toString()}) `)
            }
            
        
            console.log("done");
       
      }


    async approveUserLPTokenAmount(spender,amount) {
 
        
        //!== to be added 
           if (Number(amount)<=0) {
                
                throw new Error(`amount (${amount}) must be greater than 0 `);
            }

            const poolAddress =  await this.DefContract.getPoolAddress(); 
            const poolContractABI = poolABI;
            const poolContract = new ethers.Contract(poolAddress, poolContractABI, this.wallet);
            
            const approveRes = await poolContract.approve(spender|| await this.DefContract.getAddress(),amount);
            return approveRes
        
       
      }


    async validateUserEthAmount(amount) {
 
        
           
           if (Number(amount)<=0) {
                
                throw new Error(`amount (${amount}) must be greater than 0 `);
            }
            const userBalance = await this.provider.getBalance(this.wallet.address);

            const amountToSwap = new BigNumber(amount.toString());
            const userBalanceAvailable = new BigNumber(userBalance.toString());
            
            const isBalanceGreaterOrEqual = userBalanceAvailable.gte(amountToSwap); // userBalanceAvailable >= amountToSwap 
            
            if (!isBalanceGreaterOrEqual) {
                throw new Error(`Insufficient eth balance : user balance (${userBalance.toString()}) `)
            }
            
        
       
      }
    async validateUserTokenAmount(amount,userAddress) {
 
        
           
           if (Number(amount)<=0) {
                
                throw new Error(`amount (${amount}) must be greater than 0 `);
            }
            const userBalance = await this.getTokenBalanceOfAddress(userAddress || this.wallet.address);

            const amountToSwap = new BigNumber(amount.toString());
            const userBalanceAvailable = new BigNumber(userBalance.toString());
            
            const isBalanceGreaterOrEqual = userBalanceAvailable.gte(amountToSwap);
            
            if (!isBalanceGreaterOrEqual) {
                throw new Error(`Insufficient token balance : user balance (${userBalance.toString()}) `)
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

    async getETHBalanceOf(address) {
        try {
            const balance = await this.provider.getBalance(address);
            return balance
        } catch (error) {
            throw new Error(`Error getETHBalanceOf: ${error.message}`);
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
            
            const _allowance = await this.DefContract.allowance(owner,spender);
            return _allowance;
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


    async transferContractOwnership(_newOwner) {
        try {
            
        await this.checkIsOwner();


        let res = await this.DefContract.transferOwnership(_newOwner);
        return res

        } catch (error) {
            throw new Error(`Error transferContractOwnership: ${error.message}`);
        }
    }

    async collectTaxedTokenAsEth() {
        try {
            
        await this.checkIsOwner();


        let res = await this.DefContract.withDrawTaxCollection();
        return res

        } catch (error) {
            throw new Error(`Error collectTaxedTokenAsEth: ${error.message}`);
        }
    }


    async swapTokenWithEth(tokenAmountToSwap) {
        try {
            
        await this.validateUserTokenAmount(tokenAmountToSwap);
        await this.validateUserTokenAllowance(tokenAmountToSwap);
        
        let res = await this.DefContract.swapTokenWithEth(tokenAmountToSwap);
        return res

        } catch (error) {
            throw new Error(`Error swapTokenWithEth: ${error.message}`);
        }
    }
    
    async swapEthWithToken(ethAmountToSwap) {
        try {
            
            await this.validateUserEthAmount(ethAmountToSwap);
        
            let res = await this.DefContract.swapEthWithToken({value:ethAmountToSwap.toString()});
            return res
            
        } catch (error) {
            throw new Error(`Error swapEthWithToken: ${error.message}`);
        }
    }


    async transferDefToken(_recipent,tokenAmountToSend) {
        try {
            
            
        await this.validateUserTokenAmount(tokenAmountToSend);
        
        let res = await this.DefContract.transfer(_recipent,tokenAmountToSend);
        return res
    
        } catch (error) {
            throw new Error(`Error transferDefToken: ${error.message}`);
        }
    }


    async transferDefTokenFrom(_from,_recipent,tokenAmountToSend) {
        try {
            
            
        await this.validateUserTokenAmount(tokenAmountToSend,_from);
        await this.validateUserTokenAllowance(tokenAmountToSend,_from, await this.wallet.getAddress());
        
        let res = await this.DefContract.transferFrom(_from,_recipent,tokenAmountToSend);
        return res
    
        } catch (error) {
            throw new Error(`Error transferDefTokenFrom: ${error.message}`);
        }
    }


    async addLiquidityETHToPool(tokenAmountToSend,ethWeiAmount) {
        try {
            
            
        await this.validateUserEthAmount(ethWeiAmount);
        await this.validateUserTokenAmount(tokenAmountToSend);
        
        let res = await this.DefContract.addLiquidityETHToPool(tokenAmountToSend,{value: ethWeiAmount});
        return res
    
        } catch (error) {
            throw new Error(`Error transferDefTokenFrom: ${error.message}`);
        }
    }
    
    async removeLiquidityETHToPool(lpToken) {
        try {
            
            
        await this.validateUserLPTokenAmount(lpToken);
        await this.validateUserLPTokenAllowance(lpToken);
        
        let res = await this.DefContract.removeLiquidityETHToPool(lpToken);
        return res
    
        } catch (error) {
            throw new Error(`Error removeLiquidityETHToPool: ${error.message}`);
        }
    }






}

module.exports = defTokenSDK;
