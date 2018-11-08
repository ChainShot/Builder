import { bytecode, abi } from './EscrowContract.json';
import { web3 } from './web3Util.js';

const EscrowContract = new web3.eth.Contract(abi);

const approve = (escrowContractAddress, arbiterAddress) => {
  // TODO: Instantiate the Escrow Contract at the escrowContractAddress
  
  // TODO: Call the approve function from the arbiter address
}

export default approve;