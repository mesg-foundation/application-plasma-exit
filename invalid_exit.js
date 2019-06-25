const mesg = require('mesg-js').application(require('./config')())

const main = async (address, privateKey) => {
  const utxoRes = await mesg.executeTaskAndWaitResult({
    serviceID: 'plasma-watcher',
    taskKey: 'getUTXOs',
    inputData: JSON.stringify({ address })
  })

  const { utxos } = JSON.parse(utxoRes.outputData)
  const utxo = utxos.reverse()[0]

  const exitDataRes = await mesg.executeTaskAndWaitResult({
    serviceID: 'plasma-watcher',
    taskKey: 'getExitData',
    inputData: JSON.stringify(utxo)
  })

  const { proof, txbytes, utxo_pos } = JSON.parse(exitDataRes.outputData)

  const exitRes = await mesg.executeTaskAndWaitResult({
    serviceID: 'evm-contract',
    taskKey: 'execute',
    inputData: JSON.stringify({
      method: "startStandardExit",
      privateKey,
      inputs: [
        utxo_pos,
        txbytes,
        proof
      ],
      value: '31415926535'
    })
  })

  console.log(exitRes)
}

console.log(`[ALICE] Exiting`)
main(process.env.ALICE_ADDRESS, process.env.ALICE_PRIVATE_KEY)