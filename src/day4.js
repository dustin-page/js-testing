function timeout(callback) {
    setTimeout(() => callback('hello'), 1000);
}

function dateDescriber(otherDate) {
    const dateNow = new Date();
    //console.log(dateNow.getTime()); //Get the Epoch time

    const otherYear = otherDate.getFullYear();
    const currentYear = dateNow.getFullYear();
    
    const yearDifference = otherYear - currentYear;

    if (yearDifference > 0) {
        return 'in the future';
    } else if (yearDifference < 0) {
        return 'in the past';
    } else {
        return 'current year';
    }
}

export {
    timeout,
    dateDescriber
};