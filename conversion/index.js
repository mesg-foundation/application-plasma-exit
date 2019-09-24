const mesg = require('mesg-js').service()

mesg.listenTask({
  challengeStandardExitInputs: inputs => ({
    method: 'challengeStandardExit',
    privateKey: process.env.PRIVATE_KEY,
    inputs: [
      inputs.exit_id,
      inputs.txbytes,
      inputs.input_index,
      inputs.sig,
    ]
  })
})