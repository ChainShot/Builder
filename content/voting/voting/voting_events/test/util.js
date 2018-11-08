const getAttributes = async (contract, method, id) => {
  let values = await contract[method](id);
  let {outputs} = contract.abi.find(x => x.name === method);
  return outputs.reduce((obj, { name }, idx) => {
    obj[name] = values[idx];
    return obj;
  }, {});
}

module.exports = { getAttributes }
