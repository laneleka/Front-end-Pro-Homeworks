const DURATION_COLOR = 500;
const DURATION_POSITON = 1000;
const MAX_RGB_VALUE = 255;

const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const getRandomColor = () => {
    const colors = [];

    for (let i = 0; i < 3; i++) {
        colors.push(getRandomIntInclusive(0, MAX_RGB_VALUE));
    }
    return `rgb(${colors.join(',')})`;
}

const setRandomColorToEl = (element) => {
    element.style.backgroundColor = getRandomColor();
}

const getRandomPosition = (element) => {
    const maxLeft = document.body.offsetWidth - element.clientWidth;
    const maxTop = document.body.offsetHeight - element.clientHeight;

    element.style.left = `${getRandomIntInclusive(0, maxLeft)}px`;
    element.style.top = `${getRandomIntInclusive(0, maxTop)}px`;
}

const square = document.querySelector('#square');

setInterval(() => setRandomColorToEl(square), DURATION_COLOR);
setInterval(() => getRandomPosition(square), DURATION_POSITON);