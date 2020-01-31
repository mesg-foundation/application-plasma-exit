// https://github.com/omisego/omg-js/blob/master/examples/childchain-deposit-eth.js

const Web3 = require('web3')
const BigNumber = require('bn.js')
const RootChain = require('@omisego/omg-js-rootchain')
const { transaction } = require('@omisego/omg-js-util')

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_ENDPOINT))
const rootChain = new RootChain(web3, '0x24e0b6b701c941824b3eedc041f50be6e15bfdeb')

const tx = transaction.encodeDeposit(process.env.ALICE_ADDRESS, new BigNumber('10000'), transaction.ETH_CURRENCY)

rootChain.depositEth(tx, new BigNumber('10000'), {
  from: process.env.ALICE_ADDRESS,
  privateKey: process.env.ALICE_PRIVATE_KEY,
}).then(console.log)
