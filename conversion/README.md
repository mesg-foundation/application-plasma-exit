# guard-conversion (ID: guard-conversion)



## Contents

- [Installation](#Installation)
  - [MESG SDK](#MESG-SDK)
  - [Deploy the Service](#Service)
- [Definitions](#Definitions)
  - [Tasks](#Tasks)
    - [getChallengeDataInput](#getChallengeDataInput)
    - [challengeStandardExitInputs](#challengeStandardExitInputs)

## Installation

### MESG SDK

This service requires [MESG SDK](https://github.com/mesg-foundation/engine) to be installed first.

You can install MESG SDK by running the following command or [follow the installation guide](https://docs.mesg.com/guide/start-here/installation.html).

```bash
npm install -g mesg-cli
```

### Deploy the Service

To deploy this service, go to [this service page](https://marketplace.mesg.com/services/guard-conversion) on the [MESG Marketplace](https://marketplace.mesg.com) and click the button "get/buy this service".

## Definitions


### Tasks

<h4 id="getChallengeDataInput">getChallengeDataInput</h4>

Task key: `getChallengeDataInput`



##### Inputs

| **Name** | **Key** | **Type** | **Description** |
| --- | --- | --- | --- |
| **eth_height** | `eth_height` | `Number` |  |
| **utxo_pos** | `utxo_pos` | `String` |  |
| **owner** | `owner` | `String` |  |
| **currency** | `currency` | `String` |  |
| **amount** | `amount` | `Number` |  |
  
##### Outputs

| **Name** | **Key** | **Type** | **Description** |
| --- | --- | --- | --- |
| **utxo_pos** | `utxo_pos` | `String` |  |
<h4 id="challengeStandardExitInputs">challengeStandardExitInputs</h4>

Task key: `challengeStandardExitInputs`



##### Inputs

| **Name** | **Key** | **Type** | **Description** |
| --- | --- | --- | --- |
| **exit_id** | `exit_id` | `String` |  |
| **txbytes** | `txbytes` | `String` |  |
| **input_index** | `input_index` | `Number` |  |
| **sig** | `sig` | `String` |  |
  
##### Outputs

| **Name** | **Key** | **Type** | **Description** |
| --- | --- | --- | --- |
| **method** | `method` | `String` |  |
| **privateKey** | `privateKey` | `String` |  |
| **inputs** | `inputs` | `Any` |  |

