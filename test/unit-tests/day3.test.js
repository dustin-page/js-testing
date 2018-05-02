import { expect } from 'chai';
import day3 from '../../src/day3'; 

/* Asynchronous Testing */

describe('day 3 tests', () => {
    /* Example of testing an async function with a callback */
    //Pass the "done" callback to tell Mocha the async work is done
    it('should return expected value from callback', (done) => {
        day3((returnedData) => {
            expect(returnedData).to.equal('hello');
            //The done callback MUST be called if it is passed to the callback function for async tests
            done();
        });
    });

    /* Example of testing a promise */
    it('should return expected value from promise with done', (done) => {
        //Assume if we don't pass callback function through it will return as a Promise
        day3()
            .then((returnedData) => {
                expect(returnedData).to.equal('hello');
                //Call done() to tell Mocha the code is done
                done();
            });
    });

    /* Example of testing a Promise - an easier way! 
    Doesn't need the done() method.
    */
    it('should return expected value from promise', () => {
        //Don't forget to return the Promise to mocha!
        return day3()
            .then((returnedData) => {
                expect(returnedData).to.equal('hello');
            });
    });
});