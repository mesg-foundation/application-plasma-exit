# Deposit

`node deposit.js 100000`

# Get UTXOs

`mesg-cli service:execute plasma-watcher getUTXOs --data address=$ALICE_ADDRESS`

# Transact

`mesg-cli service:execute plasma-watcher sendTransaction --data from=$ALICE_ADDRESS --data to=$BOB_ADDRESS --data amount=100000 --data privateKey=$ALICE_PRIVATE_KEY`

# Exit first UTXO

`node ./invalid_exit.js`

