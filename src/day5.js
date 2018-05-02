import request from 'request';

function day5(owner, repository, callback) {
    const gitHubUrl = `http://api.github.com/repos/${owner}/${repository}`;

    const requestOptions = {
        uri: gitHubUrl,
        headers: {
            'User-Agent': 'JS-Testing-For-Beginners' //Need to pass "User-Agent" or API will return unauthorized error
        },
        resolveWithFullResponse: true, //returns the whole response
        json: true //expect JSON back from request so we don't have to do JSON.parse
    }

    request.get(requestOptions, (error, response, body) => {

        if (response.statusCode === 403) {
            callback({
                success: false,
                statusCode: response.statusCode,
                error: 'API is rate limited - try again later'

            })
        } else {
            callback({
                stars: body.stargazers_count
            });
        }
    });
}

export default day5;