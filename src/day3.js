function day3(callback) {
    if (callback) {
        //Create a callback that's called after a timeout
        setTimeout(() => callback('hello'), 1000);
    } else {
        //Create a Promise and resolve it
        return Promise.resolve('hello');
    }
}

export default day3;