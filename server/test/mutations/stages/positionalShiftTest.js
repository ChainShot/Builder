const assert = require('assert');
const positionalShift = require('../../../src/schema/mutations/stage/positionalShift');

describe('positionalShift', () => {
  describe('room in front', () => {
    const stages = [
      { position: 0, id: 1 },
      { position: 1, id: 2 },
      { position: 3, id: 3 },
      { position: 3, id: 4 },
      { position: 4, id: 5 },
    ];

    before(() => {
      positionalShift(stages, 4);
    });

    it('should keep id 4 in position 3', () => {
      assert.equal(stages.find(x => x.id === 4).position, 3);
    });

    it('should move id 3 to position 2', () => {
      assert.equal(stages.find(x => x.id === 3).position, 2);
    });

    it('should have all positions filled', () => {
      for(let i = 0; i < stages.length; i++) {
        assert.equal(stages.filter(x => x.position === i).length, 1);
      }
    });
  });

  describe('room behind', () => {
    const stages = [
      { position: 0, id: 1 },
      { position: 1, id: 2 },
      { position: 2, id: 3 },
      { position: 2, id: 4 },
      { position: 4, id: 5 },
    ];

    before(() => {
      positionalShift(stages, 4);
    });

    it('should keep id 4 in position 2', () => {
      assert.equal(stages.find(x => x.id === 4).position, 2);
    });

    it('should move id 3 to position 3', () => {
      assert.equal(stages.find(x => x.id === 3).position, 3);
    });

    it('should have all positions filled', () => {
      for(let i = 0; i < stages.length; i++) {
        assert.equal(stages.filter(x => x.position === i).length, 1);
      }
    });
  });

  describe('room at the end', () => {
    const stages = [
      { position: 0, id: 1 },
      { position: 1, id: 2 },
      { position: 2, id: 3 },
      { position: 2, id: 4 },
    ];

    before(() => {
      positionalShift(stages, 4);
    });

    it('should keep id 4 in position 2', () => {
      assert.equal(stages.find(x => x.id === 4).position, 2);
    });

    it('should move id 3 to position 3', () => {
      assert.equal(stages.find(x => x.id === 3).position, 3);
    });

    it('should have all positions filled', () => {
      for(let i = 0; i < stages.length; i++) {
        assert.equal(stages.filter(x => x.position === i).length, 1);
      }
    });
  });

  describe('no changes necessary', () => {
    const stages = [
      { position: 0, id: 1 },
      { position: 1, id: 2 },
      { position: 2, id: 3 },
      { position: 3, id: 4 },
      { position: 4, id: 5 },
    ];

    before(() => {
      positionalShift(stages, 4);
    });

    it('should have all positions filled', () => {
      for(let i = 0; i < stages.length; i++) {
        assert.equal(stages.filter(x => x.position === i).length, 1);
      }
    });
  });
})
