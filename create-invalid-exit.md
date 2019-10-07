## Check balance of Alice

```bash
mesg-cli service:execute plasma-watcher getUTXOs --data address=$ALICE_ADDRESS
```

Alice has no UTXO to spend

## Alice deposit

```bash
node scripts/deposit.js 100000
```

## Wait for utxo to be added on the childchain

```bash
mesg-cli service:execute plasma-watcher getUTXOs --data address=$ALICE_ADDRESS
```

Alice has one UTXO

## Prepare to exit

Now you will try to exit the first UTXO that you had after your deposit.
You already spent this UTXO and send all the amount to Bob so this is an invalid exit.

```bash
mesg-cli service:execute plasma-watcher getUTXOs --data address=$ALICE_ADDRESS | jq ".utxos[0]" > utxo.json
mesg-cli service:execute plasma-watcher getExitData --json utxo.json > exit.json
```

## Transfer some value to BOB

```bash
mesg-cli service:execute plasma-watcher sendTransaction --data from=$ALICE_ADDRESS --data to=$BOB_ADDRESS --data amount=100000 --data privateKey=$ALICE_PRIVATE_KEY --data utxos="[$(cat utxo.json)]" 
```

## Wait for transaction

http://quest.samrong.omg.network/

## Check Alice UTXO

```bash
mesg-cli service:execute plasma-watcher getUTXOs --data address=$ALICE_ADDRESS
```

Alice has no UTXO to spend

## Exit the initial UTXO

Now you will try to exit the first UTXO that you had after your deposit.
You already spent this UTXO and send all the amount to Bob so this is an invalid exit.

```bash
node scripts/exit.js "$(cat exit.json)"
```

## Wait for it

After few seconds/minutes, the plasma-watcher should emit a new event `invalid_exit` and the application should catch this event and automatically create and submit a challenge to the root chain