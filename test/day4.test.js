import sinon from 'sinon';
import { expect } from 'chai';
import { timeout, dateDescriber } from '../src/day4'; //ES6 module import syntax

/* Time travelling with sinon (test double library) fake timers */

describe('day 4 tests', () => {
    describe('timeout tests', () => {
        let clock;

        //Set something up before each test
        beforeEach(() => {
            //Tell sinon to use a fake timer in our test. If we do this, it means that global timer functions such as setTimeout, setInterval and so on, are overwritten with synchronous versions instead.

            //Stub the Timers and Date objects
            clock = sinon.useFakeTimers();
        });
        //Restore something after each test
        afterEach(() => {
            //Restore the Timers and Date Objects after each test
            clock.restore();
        });

        it('should return expected value from callback', (done) => {
            timeout((returnedData) => {
                expect(returnedData).to.equal('hello');
                done();
            });

            //Calling the tick() method of the new clock that we've created from the fake timers. This will make the setTimeout timer trigger as it thinks that 1 second has passed.
            //If you run the test again, what happens? It runs but now it's really fast. For me it was around 18ms. That's almost 55 times faster!
            clock.tick(1000);
        });

    });

    describe('dateDescriber tests', () => {

        let clock;
        //Big Problem: Need to stub the date using fake timers or the tests will fail next year!
        //This also prevents the test from failing on a CI server like Travis.
        //Tests should always succeed based on the current year we are defining. This makes them future proof
        const currentYear = 2017;

        beforeEach(() => {

            const now = new Date(currentYear, 1, 1);
            //Pass the stubbed new Date to useFakeTimers as the Date I defined
            clock = sinon.useFakeTimers(now);
        });

        afterEach(() => {
            clock.restore();
        });

        it('should correctly describe a future year', () => {
            const description = dateDescriber(new Date(currentYear + 1, 1, 1));

            expect(description).to.equal('in the future');
        });

        it('should correctly describe a past year', () => {
            const description = dateDescriber(new Date(currentYear - 1, 1, 1));

            expect(description).to.equal('in the past');
        });

        it('should correctly describe the current year', () => {
            const description = dateDescriber(new Date(currentYear, 1, 1));

            expect(description).to.equal('current year');
        });
    });
});