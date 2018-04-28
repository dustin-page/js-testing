import { expect } from 'chai';
import day2 from '../src/day2';

describe('day 2 tests', () => {

    describe('check data type', () => {
        it('should return undefined if no parameter passed', () => {
            //Chai expectation
            expect(day2()).to.be.undefined;
        });

        it('should return a string when a string is passed', () => {
            expect(day2('a string')).to.be.a('string');
        });

        it('should return a number when a number is passed', () => {
            expect(day2(10)).to.be.a('number');
        });

        it('should not be a string when a number is passed', () => {
            expect(day2(10)).not.to.be.a('string');
        });
    });

    describe('checking equals', () => {
        it('should equal the string passed', () => {
            //Strict equal test
            expect(day2('same string')).to.equal('same string');
        });

        it('should deep equal the object passed', () => {
            //Deep equals - Checks that all of the values in an object are the same, but it's not the same reference
            const givenObject = {
                hello: 'world'
            };
            expect(day2(givenObject)).to.deep.equal(givenObject);
        });
    });

    describe('checking contains', () => {
        it('should contain part of the string passed', () => {
            expect(day2('given this string')).to.contain('given');
        });
    });

    describe('checking errors', () => {
        it('should throw an error when "error" is passed', () => {
            function wrappedFunction() {
                return day2('error');
            }
            expect(wrappedFunction).to.throw('Cannot pass error');
        });
    });
    
});