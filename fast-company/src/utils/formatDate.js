const ONE_MINUTE = 1000 * 60;
const FIVE_MINUTES = ONE_MINUTE * 5;
const TEN_MINUTES = ONE_MINUTE * 10;
const THIRTY_MINUTES = TEN_MINUTES * 3;
const DAY = ONE_MINUTE * 60 * 24;

const parseNumber = (number) =>
    number < 10 ? `0${number}` : number.toString();

export function formatDate(timeStamp) {
    const currentDate = new Date();
    const diff = currentDate.getTime() - timeStamp;
    const timeStampDate = new Date(timeStamp);

    if (diff <= ONE_MINUTE) {
        return "1 минуту назад";
    }

    if (diff <= FIVE_MINUTES) {
        return "5 минут назад";
    }

    if (diff <= TEN_MINUTES) {
        return "10 минут назад";
    }

    if (diff <= THIRTY_MINUTES) {
        return "30 минут назад";
    }

    if (diff <= DAY) {
        return `${parseNumber(currentDate.getHours())}.${parseNumber(
            currentDate.getMinutes()
        )}`;
    }

    if (timeStampDate.getFullYear === currentDate.getFullYear) {
        return `${parseNumber(currentDate.getDate())}.${parseNumber(
            currentDate.getMonth()
        )}`;
    }

    return `${parseNumber(currentDate.getDate())}.${parseNumber(
        currentDate.getMonth()
    )}.${currentDate.getFullYear()}`;
}
