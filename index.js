const mesg = require('mesg-js').application(require('./config')())

const callSmartContract = (method, inputs) => mesg.executeTask({
  serviceID: 'evm-contract',
  taskKey: 'execute',
  inputData: JSON.stringify({
    method,
    privateKey: process.env.ALICE_PRIVATE_KEY,
    inputs
  })
})

const challengeData = async utxo_pos => {
  const res = await mesg.executeTaskAndWaitResult({
    serviceID: 'plasma-watcher',
    taskKey: 'getChallengeData',
    inputData: JSON.stringify({ utxo_pos })
  })
  return JSON.parse(res.outputData)
}

mesg.listenEvent({ serviceID: 'plasma-watcher', eventFilter: 'invalid_exit' })
  .on('data', async event => {
    const data = JSON.parse(event.eventData)
    const challenge = await challengeData(data.utxo_pos)
    console.log(challenge)
    await callSmartContract('challengeStandardExit', [
      challenge.exit_id, // _standardExitId
      challenge.txbytes, // _challengeTx
      challenge.input_index, // _inputIndex
      challenge.sig, // _challengeTxSig
    ])
  })
