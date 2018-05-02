import request from 'request';
import day5 from '../../src/day5';

describe('day5 tests', () => {

    //Spies wrap objects and functions and can report on how they were called
    //Spies do not replace the objects and functions
    describe('using spies', () => {
        //spies on the http request and its GET method
        let spyRequestGet;

        beforeEach(() => {
            spyRequestGet = sinon.spy(request, 'get');
        });

        afterEach(() => {
            //If we don't restore the request it will still be in a state where it is being spied upon
            spyRequestGet.restore();
        });

        //Should make 1 GET request
        //Async request needs to the 'done' function
        it('should make a get request once', (done) => {
            day5('expressjs', 'express', (data) => {
                expect(spyRequestGet.callCount).to.equal(1);
                done();
            })
        });

        //Should make request with expected URL
        it('should make request with expected URL', (done) => {
            //With a spy or stub you can get the arguments or parameters passed to the function
            //so we can check the expected URL
            day5('expressjs', 'express', (data) => {
                expect(spyRequestGet.getCall(0).args[0].uri).to.equal('http://api.github.com/repos/expressjs/express'); //getCall gives us the parameters used for the call
                done();
            });

        });
    });

    //Stubs actually replace the methods they stub
    //This means we can get the GET request to return whatever data we stub it with
    describe('using stubs', () => {

        let stubRequestGet;



        //If you're using stubs you should ALWAYS set them up before a test and clean them up after the test.
        beforeEach(() => {
            stubRequestGet = sinon.stub(request, 'get');
        });

        afterEach(() => {
            stubRequestGet.restore();
        });

        //Should make 1 request
        it('should make one GET request', (done) => {
            //Need to call yields; which attempts to find the first callback function in the thing you are stubbing
            //In this case it finds the (error, response, body) callback function and we can tell it the data we want to return

            //stubRequestGet.yields(); //If we don't care what the data is we can leave yields() method empty

            stubRequestGet.yields(
                null,
                { statusCode: 200 },
                { stargazers_count: 1000 }
            );

            day5('expressjs', 'express', (data) => {
                expect(stubRequestGet.callCount).to.equal(1);
                done();
            });
        });

        //Should return correct data
        it('should return expected data', (done) => {
            //The following stub code acts as the github API 

            //Stub a given response
            const givenApiResponse = {
                'stargazers_count': 100
            };

            //Stubs the API response
            //yields calls the GET request callback with these arguments (error, response, body)
            stubRequestGet.yields(
                null,
                { statusCode: 200 },
                givenApiResponse
            );

            day5('expressjs', 'express', (data) => {
                expect(data).to.deep.equal({
                    'stars': givenApiResponse.stargazers_count
                });
                done();
            });
        });

        //Should return correct data when error
        it('should return expected data when rate limited', (done) => {
            const givenApiResponse = {
                'message': 'API rate limit exceeded',
                'documentation_url': 'https://developer.github.com/v3/#rate-limiting'
            };

            stubRequestGet.yields(
                new Error('API rate limit exceeded'),
                { statusCode: 403 },
                givenApiResponse
            );

            //Stub out an error message when rate limited
            day5('expressjs', 'express', (data) => {
                expect(data).to.deep.equal({
                    success: false,
                    statusCode: 403,
                    error: 'API is rate limited - try again later'
                });
                done();
            });
        });

    });
});