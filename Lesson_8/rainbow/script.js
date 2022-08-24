const hero = ['Ivan'];
const native = ['York', 'Of'];
const destination = ['Poltava', 'In'];

let finalString = '';

const rainbow = hero.concat(native, destination).reverse(); // ['In', 'Poltava', 'Of', 'York', 'Ivan']

const removedElement = rainbow.shift(); // ['Poltava', 'Of', 'York', 'Ivan']

rainbow.splice(3, 1, 'Gave', 'Battle', removedElement, 'Vain'); // ['Poltava', 'Of', 'York', 'Gave', 'Battle', 'In', 'Vain']
rainbow.shift();
rainbow.unshift('Richard');

for (let i = 0; i < rainbow.length; i++) {

  let color = '';

  switch (rainbow[i]) {
    case 'Richard':
      color = 'red';
      break;

    case 'Of':
      color = 'orange';
      break;

    case 'York':
      color = 'yellow';
      break;

    case 'Gave':
      color = 'green';
      break;

    case 'Battle':
      color = 'blue';
      break;

    case 'In':
      color = 'indigo';
      break;

    case 'Vain':
      color = 'violet';
      break;
    
    default:
      color = 'black';
      break;
  }

  finalString += `<div class="rainbow-item">
                    <div class="circle ${color}"></div>
                    ${rainbow[i]}
                  </div>`
}

document.write(`<div class="wrapper">${finalString}</div>`);

