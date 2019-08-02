const mesg = require('mesg-js').application()
const { transaction } = require('@omisego/omg-js-util')

const main = async (address, privateKey, value) => {
  const depositTx = await transaction.encodeDeposit(address, value, transaction.ETH_CURRENCY)

  const res = await mesg.executeTaskAndWaitResult({
    instanceHash: await mesg.resolve('evm-contract'),
    taskKey: 'execute',
    inputs: mesg.encodeData({
      method: "deposit",
      privateKey,
      inputs: [depositTx],
      value
    })
  })

  console.log(res)
}

if (!process.argv[2]) throw new Error('amount in wei missing')

console.log(`[ALICE] Sending ${process.argv[2]}wei`)
main(process.env.ALICE_ADDRESS, process.env.ALICE_PRIVATE_KEY, process.argv[2])