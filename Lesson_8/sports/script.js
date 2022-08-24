const sports = [
  ['skier','⛷'],
	['snowboarder','🏂'],
	['apple','🍎'],
	['hockey','🏒'],
	['ice skate','⛸'],
	['swimmer','🏊'],
	['surfer','🏄‍'],
	['watermelon','🍉'],
	['lemon','🍋'],
	['rowboat','🚣'],
	['bicyclist','🚴‍']
];

const winterSports = sports.slice(0, 5);
const summerSports = sports.slice(5);
const fruits = [].concat(winterSports.splice(2, 1), summerSports.splice(2, 2));

let finalWinterSports = '';
let finalSummerSports = '';
let finalFruits = '';

for (let i = 0; i < winterSports.length; i++) {
  finalWinterSports += `${winterSports[i].join(': ')}\n`;
}

for (let i = 0; i < summerSports.length; i++) {
  finalSummerSports += `${summerSports[i].join(': ')}\n`;
}

for (let i = 0; i < fruits.length; i++) {
  finalFruits += `${fruits[i].join(': ')}\n`;
}

console.log(`*** Winter sports ***
${finalWinterSports}
*** Summer sports ***
${finalSummerSports}
*** Fruits ***
${finalFruits}
`);