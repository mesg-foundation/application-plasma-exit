# Plasma service

The goal of this project is for a plasma user (or a plasma service provider) to be able to run on a server or its own computer a watcher that listen for any issue on the plasma chain and immediately react and exit the plasma chain or challenge invalid data

## Workflows

Based on https://github.com/omisego/elixir-omg/blob/master/docs/api_specs/status_events_specs.md#byzantine-events

| Event | Task | Implementation |
| - | - | - |
| invalid_exit | challengeStandardExit | [invalid-exit.yml](invalid-exit.yml) | 
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
                     |  Plasma Process  |
                     |                  |
                     +------------------+
                     | PRIVATE_KEY      |
                     +------------------+

```

## Start the Plasma Guard

If you don't already have mesg you should install and run it with:
```bash
npm i -g mesg-cli
mesg-cli daemon:start
```
[more information](https://docs.mesg.com/guide/installation.html)

```bash
mesg-cli process:dev ./invalid-exit.yml \
     --env PRIVATE_KEY=$ALICE_PRIVATE_KEY \
     --env PROVIDER_ENDPOINT=$PROVIDER_ENDPOINT \
     --env PLASMA_ADDRESS=$PLASMA_ADDRESS \
     --env PLASMA_ABI="$(curl -s https://raw.githubusercontent.com/omisego/omg-js/v2.0.0-v0.2/packages/omg-js-rootchain/src/contracts/RootChain.json | jq .abi)"
```

## Create an invalid exit

[Check how to create an invalid exit](./create-invalid-exit.md)
