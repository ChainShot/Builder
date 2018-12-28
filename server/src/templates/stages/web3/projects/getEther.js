const { web3 } = require('./setup');

async function getEther(address) {
    const balance = await web3.eth.getBalance(address);
    return web3.utils.fromWei(balance);
}

export default getEther;