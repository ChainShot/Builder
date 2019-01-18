// moves all stages within a container to accommodate the stubborn stage
// assumes we're only moving one stage and we were zero-indexed beforehand
function positionalShift(stages, stubbornStageId) {
  const stubborn = stages.find(x => x.id === stubbornStageId);
  let inFront = false;
  if(stubbornStageId) {
    // is there an open spot in front of the stubborn stage?
    for(let i = 0; i < stubborn.position; i++) {
      const existing = stages.find(x => x.position === i);
      if(!existing) {
        inFront = true;
      }
    }
  }
  else {
    // no stubborn id
    // we're just pulling positions forward as needed
    inFront = true;
  }

  if(inFront) {
    // there is a spot in front of the stubborn stage (or no stubborn stage)
    // we'll pull forward non-stubborn stage ids until it all fits
    const sorted = stages.sort((a,b) => a.position - b.position);
    for(let i = 0; i < sorted.length; i++) {
      const inPosition = stages.filter(x => x.position === i);
      if(inPosition.length === 0) {
        // we need to find one to fill this position
        const nextPosition = (i + 1);
        const inNextPosition = stages.filter(x => x.position === nextPosition);
        if(inNextPosition.length === 2) {
          const nonStubborn = inNextPosition.find(x => x.id !== stubbornStageId);
          nonStubborn.position = i;
        }
        else {
          inNextPosition[0].position = i;
        }
      }
    }
  }
  else {
    // no spots in front, we'll need to move the non-stubborn back when encountered
    const sorted = stages.sort((a,b) => a.position - b.position);
    // keep track of the ones we've moved already; push back others instead
    const moved = [];
    for(let i = 0; i < sorted.length; i++) {
      const inPosition = stages.filter(x => x.position === i);
      if(inPosition.length === 2) {
        // we need to move the non-stubborn, non-moved one back
        const moveable = inPosition.find(x => x.id !== stubbornStageId && moved.indexOf(x.id) === -1);
        moveable.position = i + 1;
        moved.push(moveable.id);
      }
    }
  }
}

module.exports = positionalShift;
