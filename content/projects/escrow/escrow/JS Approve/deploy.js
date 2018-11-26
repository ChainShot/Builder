// TO POTENTIAL EDITOR: MAKE SURE YOU KNOW WHAT YOU'RE DOING BEFORE YOU EDIT THIS FILE
// this is the deploy.js that is invisible on the JS Approve stage because we need a working version on that stage
// we could use the deploy.js from the previous stage, but I didn't want to make it more confusing

import {bytecode, abi} from './EscrowContract.json';
import {web3} from './web3Util.js';

const EscrowContract = new web3.eth.Contract(abi);

const deploy = (value, arbiterAddress, beneficiaryAddress, depositorAddress) => {
    const deployParameters = {
        arguments: [arbiterAddress, beneficiaryAddress],
        value,
        data: bytecode
    }
    return EscrowContract.deploy(deployParameters).estimateGas().then((gas) => {
        return EscrowContract.deploy(deployParameters).send({
            from: depositorAddress,
            gas
        });
    })
}

export default deploy;