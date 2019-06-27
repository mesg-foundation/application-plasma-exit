const mesg = require('mesg-js').application(require('./config')())

const main = async (utxo, privateKey) => {
  const exitDataRes = await mesg.executeTaskAndWaitResult({
    serviceID: 'plasma-watcher',
    taskKey: 'getExitData',
    inputData: JSON.stringify(utxo)
  })

  const exitData = JSON.parse(exitDataRes.outputData)
  console.log('exit data', exitData)

  const exitRes = await mesg.executeTaskAndWaitResult({
    serviceID: 'evm-contract',
    taskKey: 'execute',
    inputData: JSON.stringify({
      method: "startStandardExit",
      privateKey,
      inputs: [
        exitData.utxo_pos,
        exitData.txbytes,
        exitData.proof
      ],
      value: '31415926535'
    })
  })

  console.log(exitRes.outputData)
}

if (!process.argv[2]) throw new Error('UTXO missing')

const utxo = JSON.parse(process.argv[2])

console.log(`[ALICE] Exiting`, utxo)
main(utxo, process.env.ALICE_PRIVATE_KEY)