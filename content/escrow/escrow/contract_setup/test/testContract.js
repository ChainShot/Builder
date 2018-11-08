const EscrowContract = artifacts.require('EscrowContract');
const errors = [
  "Make sure to declare a public address arbiter in your contract!",
  "The arbiter address wasn't set to the expected value. It is the first argument passed into the constructor",
  "Make sure to declare a public address depositor in your contract!",
  "The depositor address wasn't set to the expected value. This should be set as the address calling the constructor",
  "Make sure to declare a public address beneficiary in your contract!",
  "The beneficary address wasn't set to the expected value. It is the second argument passed into the constructor",
]
contract('EscrowContract', function(accounts) {
    let contract;
    let _depositor = accounts[0];
    let _arbiter = accounts[1];
    let _beneficiary = accounts[2];
    before(async () => {
        contract = await EscrowContract.new(_arbiter, _beneficiary, {
            from: _depositor,
            gasPrice: 0,
        });
    });
    describe('Contract Stage tests', function() {
        it('should declare an arbiter', async function() {
          assert(contract.arbiter, errors[0]);
        });

        it('should declare an depositor', async function() {
          assert(contract.depositor, errors[2]);
        });

        it('should declare an beneficiary', async function() {
          assert(contract.beneficiary, errors[4]);
        });
    });
});