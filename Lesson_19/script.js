const STEP = 10;
const DOUBLE_STEP = 10 * 2;
const DURATION_PUMP = 500;
const DURATION_OF_BAMS = 2000;

const DIRECTION = {
    LEFT: 'left',
    RIGHT: 'right',
    TOP: 'top',
    BOTTOM: 'bottom',
};

const bamsOfBody = (element) => {
    element.innerHTML = 'БЕМС';
    setTimeout(() => element.innerHTML = '', DURATION_OF_BAMS);
}

const moveElement = (element, direction, step = STEP) => {
    switch(direction) {
        case DIRECTION.RIGHT: 
            element.style.left = parseInt(element.style.left) + step + 'px';
            break;
        case DIRECTION.LEFT: 
            element.style.left = parseInt(element.style.left) - step + 'px';
            break;
        case DIRECTION.BOTTOM: 
            element.style.top = parseInt(element.style.top) + step + 'px';
            break;
        case DIRECTION.TOP:
            element.style.top = parseInt(element.style.top) - step + 'px';
            break;
    }
}

const movingRight = (element) => {
    if (element.offsetLeft + element.clientWidth + STEP > document.body.offsetWidth) {
        moveElement(element, DIRECTION.LEFT, DOUBLE_STEP);
        bamsOfBody(element);
    } else {
        moveElement(element, DIRECTION.RIGHT);
    }
}

const movingLeft = (element) => {
    if ((element.offsetLeft-STEP) < 0) {
        moveElement(element, DIRECTION.RIGHT, DOUBLE_STEP);
        bamsOfBody(element);
    } else {
        moveElement(element, DIRECTION.LEFT);
    }
}

const movingBottom = (element) => {
    if (element.offsetTop + element.clientHeight + STEP > document.body.offsetHeight) {
        moveElement(element, DIRECTION.TOP, DOUBLE_STEP);
        bamsOfBody(element);
    } else {
        moveElement(element, DIRECTION.BOTTOM);
    }
}

const movingTop = (element) => {
    if (element.offsetTop - STEP < 0) {
        moveElement(element, DIRECTION.BOTTOM, DOUBLE_STEP);
        bamsOfBody(element);
    } else {
        moveElement(element, DIRECTION.TOP);
    }
}

const jumpUp = (element) => {
    movingTop(element);
    setTimeout(() => movingBottom(element), DURATION_PUMP);
}

const sitDown = (baseElement) => {
    let intervalId = null;
    const baseWidth = baseElement.style.width;
    const baseHeight = baseElement.style.height;

    const SIT_DOWN_WIDTH = (baseElement.clientWidth * 25) / 100;
    const SIT_DOWN_HEIGHT = (baseElement.clientHeight * 40) / 100;

    const changedElementWidth = parseInt(baseElement.clientWidth) + SIT_DOWN_WIDTH + 'px';
    const changedElementHeight = parseInt(baseElement.clientHeight) - SIT_DOWN_HEIGHT + 'px';

    return function(element) {
        if (intervalId) {
            element.style.width = baseWidth;
            element.style.height = baseHeight;
            clearInterval(intervalId);
            intervalId = null;
        }

        element.style.width  = changedElementWidth;
        element.style.height = changedElementHeight;

        intervalId = setTimeout(() => {
            element.style.width = baseWidth;
            element.style.height = baseHeight;
            intervalId = null;
        }, DURATION_PUMP);
    }
}

const block = document.querySelector('#block');

block.style.left = 0;
block.style.top = 0;

const ACTIONS = {
    17: sitDown(block),
    32: jumpUp,
    37: movingLeft,
    38: movingTop,
    39: movingRight,
    40: movingBottom,
}

document.addEventListener('keydown', e => {
    if (ACTIONS[e.keyCode]) {
        ACTIONS[e.keyCode](block);
    } 
});
