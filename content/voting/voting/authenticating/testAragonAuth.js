const Voting = artifacts.require('Voting');
const ACL = artifacts.require('@aragon/os/contracts/acl/ACL');
const Kernel = artifacts.require('@aragon/os/contracts/kernel/Kernel');
const DAOFactory = artifacts.require('@aragon/os/contracts/factory/DAOFactory');

const getContract = name => artifacts.require(name);

contract('Voting App', accounts => {
    let daoFact, app, acl;
    const root = accounts[0];

    before(async () => {
        const kernelBase = await getContract('Kernel').new()
        const aclBase = await getContract('ACL').new()
        daoFact = await DAOFactory.new(kernelBase.address, aclBase.address, '0x00')
    })

    beforeEach(async () => {
        const r = await daoFact.newDAO(root)
        const dao = Kernel.at(r.logs.filter(l => l.event == 'DeployDAO')[0].args.dao)
        acl = ACL.at(await dao.acl())
        await acl.createPermission(root, dao.address, await dao.APP_MANAGER_ROLE(), root, { from: root })
        const receipt = await dao.newAppInstance('0x1234', (await Voting.new()).address, { from: root })
        app = Voting.at(receipt.logs.filter(l => l.event == 'NewAppProxy')[0].args.proxy)
    })

    describe('creating vote', () => {
        let voter1 = accounts[1];

        describe('with permission', () => {
          beforeEach(async () => {
              await acl.createPermission(voter1, app.address, await app.CREATE_VOTES_ROLE(), root, { from: root })
          });

          it('should be allowed', async () => {
              await expectNoThrow(app.newVote('Can I create a vote?', { from: voter1 }));
          });

          describe('and casting votes', () => {
            let permissed = accounts[2];
            let unpermissed = accounts[3];
            beforeEach(async () => {
              await app.newVote('Can I create a vote?', { from: voter1 })
              await acl.createPermission(permissed, app.address, await app.CAST_VOTES_ROLE(), root, { from: root })
            })

            describe('with permission', () => {
              it('should be allowed', async () => {
                await expectNoThrow(app.castVote(0, false, { from: permissed }))
              })
            })

            describe('without permission', () => {
              it('should not be allowed', async () => {
                await expectThrow(app.castVote(0, false, { from: unpermissed }))
              })
            })
          })
        });

        describe('without permission', () => {
          it('should not be allowed', async () => {
              await expectThrow(app.newVote('Can I create a vote?', { from: voter1 }));
          });
        });
    })
})

async function expectNoThrow(promise) {
    let exception;
    try {
      await promise;
    }
    catch(ex) {
      exception = ex;
    }
    assert(!exception, 'An unexpected exception occured');
}

async function expectThrow(promise) {
    const errMsg = 'Expected throw not received';
    try {
        await promise;
    } catch (err) {
        assert(err.toString().includes('revert'), errMsg);
        return;
    }

    assert(false, errMsg);
}
