# Plasma service

The goal of this project is for a plasma user (or a plasma service provider) to be able to run on a server or its own computer a watcher that listen for any issue on the plasma chain and immediately react and exit the plasma chain or challenge invalid data

## Workflows

Based on https://github.com/omisego/elixir-omg/blob/master/docs/api_specs/status_events_specs.md#byzantine-events

| Event | Task | Implementation |
| - | - | - |
| invalid_exit | challengeStandardExit | [/plasma-service/index.js#24](/plasma-service/index.js#24) | TODO | 
| unchallenged_exit | startInFlightExit | TODO | 
| invalid_block | startInFlightExit | TODO | 
| block_withholding | startInFlightExit | TODO | 
| noncanonical_ife | challengeInFlightExitNotCanonical | TODO | 
| invalid_ife_challenge | respondToNonCanonicalChallenge | TODO | 

<!-- | piggyback_available |  |
| invalid_piggyback |  | -->


## Architecture
```
   +-------------------+               +-------------------+
   |                   |               |                   |
   |   Plasma Watcher  |               |  Plasma Contract  |
   |                   |               |                   |
   +-------------------+               +-------------------+
                |                                ^
                |                                |
           invalid_exit                  challengeStandardExit
                |                                |
                |                                |
                |    +------------------+        |
                +--->|                  |--------+
                     |  Plasma Service  |
                     |                  |
                     +------------------+
                     | PRIVATE_KEY      |
                     +------------------+

```

## Start the plasma root chain

Service to access to the root contract based on the address in the .env.

Start this service with

```bash
mesg-cli service:dev https://github.com/mesg-foundation/service-ethereum-contract \
  --env PROVIDER_ENDPOINT=$PLASMA_NETWORK \
  --env BLOCK_CONFIRMATIONS=0 \
  --env CONTRACT_ADDRESS=$PLASMA_ADDRESS \
  --env CONTRACT_ABI="$(curl -s https://raw.githubusercontent.com/omisego/omg-js/master/packages/omg-js-rootchain/src/contracts/RootChain.json | jq .abi)"
```

## Start the plasma watcher

OmiseGo watcher based on the http://watcher.samrong.omg.network/ API.

Start with 
```bash
mesg-cli service:dev https://github.com/mesg-foundation/service-plasma-omisego-watcher
```

## Start the application 

```
node index.js
```

## Create an invalid exit

[Check how to create an invalid exit](./create-invalid-exit.md)