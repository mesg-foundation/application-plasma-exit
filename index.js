const mesg = require('mesg-js').application()

const challengeInvalidExits = (watcher, contract) => {
  console.log('Start listening')
  mesg.listenEvent({
    filter: {
      instanceHash: watcher,
      key: 'invalid_exit'
    }
  })
    .on('data', async event => {
      const invalidExit = JSON.parse(event.data)

      console.log('Receiving an invalid exit', invalidExit)

      const challengeResponse = await mesg.executeTaskAndWaitResult({
        instanceHash: watcher,
        taskKey: 'getChallengeData',
        inputs: JSON.stringify({
          utxo_pos: invalidExit.utxo_pos
        })
      })
      const challenge = JSON.parse(challengeResponse.outputs)

      console.log('Challenging the invalid exit', challenge)

      const challengeExitResponse = await mesg.executeTaskAndWaitResult({
        instanceHash: contract,
        taskKey: 'execute',
        inputs: JSON.stringify({
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

      console.log('Challenge sent', JSON.parse(challengeExitResponse.outputs))
    })
}

Promise.all([
  mesg.resolve('plasma-watcher'),
  mesg.resolve('evm-contract')
]).then(instances => challengeInvalidExits(...instances))