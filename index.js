const mesg = require('mesg-js').application(require('./config')())

mesg.listenEvent({ serviceID: 'plasma-watcher', eventFilter: 'invalid_exit' })
  .on('data', async event => {
    const invalidExit = JSON.parse(event.eventData)

    console.log('Receiving an invalid exit', invalidExit)

    const challengeResponse = await mesg.executeTaskAndWaitResult({
      serviceID: 'plasma-watcher',
      taskKey: 'getChallengeData',
      inputData: JSON.stringify({
        utxo_pos: invalidExit.utxo_pos
      })
    })
    const challenge = JSON.parse(challengeResponse.outputData)

    console.log('Challenging the invalid exit', challenge)

    const challengeExitResponse = await mesg.executeTaskAndWaitResult({
      serviceID: 'evm-contract',
      taskKey: 'execute',
      inputData: JSON.stringify({
        method: 'challengeStandardExit',
        privateKey: process.env.BOB_PRIVATE_KEY,
        inputs: [
          challenge.exit_id,
          challenge.txbytes,
          challenge.input_index,
          challenge.sig,
        ]
      })
    })

    console.log('Challenge sent', JSON.parse(challengeExitResponse.outputData))
  })
