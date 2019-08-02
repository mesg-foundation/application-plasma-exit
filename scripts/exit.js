const mesg = require('mesg-js').application()

const main = async (utxo, privateKey) => {
  const exitDataRes = await mesg.executeTaskAndWaitResult({
    instanceHash: await mesg.resolve('plasma-watcher'),
    taskKey: 'getExitData',
    inputs: mesg.encodeData(utxo)
  })

  const exitData = mesg.decodeData(exitDataRes.outputs)
  console.log('exit data', exitData)

  const exitRes = await mesg.executeTaskAndWaitResult({
    instanceHash: await mesg.resolve('evm-contract'),
    taskKey: 'execute',
    inputs: mesg.encodeData({
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

  console.log(mesg.decodeData(exitRes.outputs))
}

if (!process.argv[2]) throw new Error('UTXO missing')

const utxo = JSON.parse(process.argv[2])

console.log(`[ALICE] Exiting`, utxo)
main(utxo, process.env.ALICE_PRIVATE_KEY)