const { ethers } = require('ethers');
require('dotenv').config();
const axios = require('axios');
const ABI = require("./DefContractABI.json")



class defTokenSDK {
    constructor(rpcUrl, privateKey) {
        try {

            this.provider = new ethers.JsonRpcProvider(rpcUrl);
            this.wallet = new ethers.Wallet(privateKey, this.provider);

            // this.getContract();

        } catch (error) {
            throw new Error(`Error creating sdk: ${error.message}`);

        }
    }

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
            // console.log('Current chain:', network.name);
            // console.log('Chain ID:', network.chainId);
            return network;
        } catch (error) {
            console.error('Error getting current chain:', error.message);
        }
    }


    async getContract() {
        try {


            // console.log(this.provider);
            // console.log(this.signer);
            // console.log(await this.signer.getAddress());
            // const address = await this.signer.getAddress();

            const contractAddress = '0xA4DeF42d5dFB3833294DB7D9305ADF9d11d1E840';
            const contractABI = ABI;

            this.DefContract = new ethers.Contract(contractAddress, contractABI, this.wallet);
            return this.DefContract
        } catch (error) {
            throw new Error(`Error getting contract instance: ${error.message}`);
        }
    }
}

module.exports = defTokenSDK;