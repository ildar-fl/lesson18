import moment from 'moment';

export const calculateSumOfNumbers = numbers => {
    return numbers.reduce((sum, item) => sum + item);
}

export const getFormattedTime = date => {
    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
}