const Schedule = artifacts.require('Schedule');

function generateDate(seconds, older = false) {
  const now = Date.now() / 1000;
  return Math.floor(now + (seconds * (older ? -1 : 1)));
}

contract('Schedule', (accounts) => {
    describe('with a single meeting in the future', () => {
      let contract;
      let date = generateDate(10);

      before(async () => {
        contract = await Schedule.new([date]);
      });

      it('should return the future date', async() => {
        let nextMeeting = await contract.findNextMeetingDate.call();
        assert.equal(nextMeeting.toNumber(), date);
      });
    });

    describe('with no meetings in the future', () => {
      let pastDates = [generateDate(10, true), generateDate(100, true), generateDate(1000, true)];
      let contract;

      before(async () => {
        contract = await Schedule.new(pastDates);
      });

      it('should return zero', async() => {
        let nextMeeting = await contract.findNextMeetingDate.call();
        assert.equal(nextMeeting.toNumber(), 0);
      });
    });

    describe('with meetings in the future and the past', () => {
      let pastDates = [generateDate(10, true), generateDate(100, true), generateDate(1000, true)];
      let futureDates = [generateDate(10), generateDate(100), generateDate(1000)];
      let contract;

      before(async () => {
        contract = await Schedule.new(pastDates.concat(futureDates));
      });

      it('should return the nearest meeting', async () => {
        let nextMeeting = await contract.findNextMeetingDate.call();
        assert(nextMeeting, "Did not return a meeting");
        assert.equal(nextMeeting.toNumber(), futureDates[0], 'Did not return the next meeting');
      });
    });
});
