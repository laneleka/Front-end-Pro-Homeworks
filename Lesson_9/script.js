const animals = [
	['🐭','mouse','Jerry'],
	['🐹','hamster','Biscuit'],
	['🐰','rabbit','Bugs'],
	['🦊','fox','Mrs. Fox'],
	['🐻','bear','Paddington']
];

const food = [
	['🍎','apple',10],
	['🍐','pear',12],
	['🍊','tangerine',15],
	['🍋','lemon',5],
	['🍌','banana',7]
];

function getInfo(arr, caption) {

  const trs = [];

  for (let i = 0; i < arr.length; i++){
    const tds = [];

    for (let j = 0; j < arr[i].length; j++){
      tds.push(`<td>${arr[i][j]}</td>`);
    }
    
    trs.push(`<tr>${tds.join('')}</tr>`)
  }

  return `<table><caption>${caption} Info</caption>${trs.join('')}</table>`
}

document.write(`${getInfo(animals, 'Animals')}${getInfo(food, 'Food')}`);