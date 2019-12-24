const Application = require('@mesg/application')

const mesg = new Application()

const main = async (exitData, privateKey) => {
  const exitRes = await mesg.executeTaskAndWaitResult({
    executorHash: await mesg.resolveRunner('evm-contract'),
    taskKey: 'execute',
    inputs: mesg.encodeData({
      method: 'startStandardExit',
      privateKey,
      inputs: [exitData.utxo_pos, exitData.txbytes, exitData.proof],
      value: '31415926535'
    })
  })

  console.log(mesg.decodeData(exitRes.outputs))
}

if (!process.argv[2]) throw new Error('exit data missing')

const exitData = JSON.parse(process.argv[2])

console.log(`[ALICE] Exiting`, exitData)
main(exitData, process.env.ALICE_PRIVATE_KEY)
