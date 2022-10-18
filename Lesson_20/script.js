const chooseShapeColor = document.querySelector(`#chooseShapeColor`);
const elementShape = document.querySelector(`#elementShape`);
const elementColor = document.querySelector(`#elementColor`);
const element = document.querySelector('#element');

let currenntColor = '';

chooseShapeColor.addEventListener('submit', event => {
    event.preventDefault();

    if (!element.classList.contains(elementShape.value)) {
        element.className = elementShape.value;
    }
   
    if(event.target[1].value !== currenntColor) {
        element.style.background = elementColor.value;
        currenntColor = elementColor.value;
    }
});