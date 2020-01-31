// https://github.com/omisego/omg-js/blob/master/examples/childchain-exit-eth.js

const Web3 = require('web3')
const RootChain = require('@omisego/omg-js-rootchain')

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.PROVIDER_ENDPOINT))
const rootChain = new RootChain(web3, '0x24e0b6b701c941824b3eedc041f50be6e15bfdeb')

const exitData = require('./exit.json')

rootChain.startStandardExit(
  exitData.utxo_pos,
  exitData.txbytes,
  exitData.proof,
  {
    from: process.env.ALICE_ADDRESS,
    privateKey: process.env.ALICE_PRIVATE_KEY
  }
).then(console.log)