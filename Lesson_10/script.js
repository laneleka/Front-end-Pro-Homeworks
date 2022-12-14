const sports = [
	['๐คบ', 'fencing'],
	['โธ', 'figure skating'],
	['โท', 'skier'],
	['๐', 'snowboarder'],
	['๐', 'golfing'],
	['๐ฃ', 'rowing boat'],
	['๐', 'swimming'],
	['๐คธ', 'gymnastics'],
	['๐คพ', 'handball']
];

const winners = [
	['fencing', '๐ฅ', 'fr'],
	['fencing', '๐ฅ', 'it'],
	['fencing', '๐ฅ', 'us'],

	['figure skating', '๐ฅ', 'ca'],
	['figure skating', '๐ฅ', 'fr'],
	['figure skating', '๐ฅ', 'us'],

	['skier', '๐ฅ', 'no'],
	['skier', '๐ฅ', 'us'],
	['skier', '๐ฅ', 'fr'],

	['snowboarder', '๐ฅ', 'us'],
	['snowboarder', '๐ฅ', 'jp'],
	['snowboarder', '๐ฅ', 'au'],

	['golfing', '๐ฅ', 'gb'],
	['golfing', '๐ฅ', 'se'],
	['golfing', '๐ฅ', 'us'],

	['rowing boat', '๐ฅ', 'us'],
	['rowing boat', '๐ฅ', 'ml'],
	['rowing boat', '๐ฅ', 'ro'],

	['swimming', '๐ฅ', 'us'],
	['swimming', '๐ฅ', 'gb'],
	['swimming', '๐ฅ', 'au'],

	['gymnastics', '๐ฅ', 'it'],
	['gymnastics', '๐ฅ', 'fr'],
	['gymnastics', '๐ฅ', 'ua'],

	['handball', '๐ฅ', 'dk'],
	['handball', '๐ฅ', 'ke'],
	['handball', '๐ฅ', 'de'],
];

const olympic = ['๐ต', 'โซ', '๐ด', '๐ก', '๐ข'];
// ะะฒัะพะฟะฐ โ ัะธะฝัะน, ะััะธะบะฐ โ ัะพัะฝะธะน, ะะผะตัะธะบะฐ โ ัะตัะฒะพะฝะธะน, ะะทัั โ ะถะพะฒัะธะน, ะะฒัััะฐะปัั โ ะทะตะปะตะฝะธะน

const continents = [
	['fr', 'Europe'],
	['it', 'Europe'],
	['us', 'America'],
	['ca', 'America'],
	['no', 'Europe'],
	['jp', 'Asia'],
	['au', 'Oceania'],
	['gb', 'Europe'],
	['se', 'Europe'],
	['ro', 'Europe'],
	['ua', 'Europe'],
	['dk', 'Europe'],
	['de', 'Europe'],
	['ke', 'Africa'],
	['ml', 'Africa']
];

const flags = [
	['fr', '๐ซ๐ท'],
	['it', '๐ฎ๐น'],
	['us', '๐บ๐ธ'],
	['ca', '๐จ๐ฆ'],
	['no', '๐ณ๐ด'],
	['jp', '๐ฏ๐ต'],
	['au', '๐ฆ๐บ'],
	['gb', '๐ฌ๐ง'],
	['se', '๐ธ๐ช'],
	['ro', '๐ท๐ด'],
	['ua', '๐บ๐ฆ'],
	['dk', '๐ฉ๐ฐ'],
	['de', '๐ฉ๐ช'],
	['ke', '๐ฐ๐ช'],
	['ml', '๐ฒ๐ฑ']
];

function updateOlympicsData(olympicArr) {
	const resultArray = [];

	for (let i = 0; i < olympicArr.length; i++) {
		switch (olympicArr[i]) {
			case '๐ต':
				resultArray.push([olympicArr[i], 'Europe']);
				break;
			case 'โซ':
				resultArray.push([olympicArr[i], 'Africa']);
				break;
			case '๐ด':
				resultArray.push([olympicArr[i], 'America']);
				break;
			case '๐ก':
				resultArray.push([olympicArr[i], 'Asia']);
				break;
			case '๐ข':
				resultArray.push([olympicArr[i], 'Oceania']);
				break;
		}
	}

	return resultArray;
}

function getCountryArr(countries, continent) {
	const countryArr = [];

	for (let i = 0; i < countries.length; i++) {
		if (countries[i][1] === continent[1]) {
			countryArr.push(countries[i][0]);
		}
	}

	return countryArr;
}

function fulfillOlympics(updateOlympics) {
	const finalOlympics = [...updateOlympics];

	for (let i = 0; i < updateOlympics.length; i++) {
		finalOlympics[i].push(...getCountryArr(continents, updateOlympics[i]));
	}

	return finalOlympics;
}

function findFlag(flagName) {
	let flag = '';

	for (let q = 0; q < flags.length; q++) {
		if (flagName === flags[q][0]) {
			flag = flags[q][1];
		}
	}

	return flag;
}

function fulfillCell(winnersFinal) {
	let cellText = '';

	for (let m = 0; m < winnersFinal.length; m++) {

		if (winnersFinal[m]) {
			cellText += `${findFlag(winnersFinal[m][2])} โ ${winnersFinal[m][1]}`;
		} else {
			cellText += '';
		}

	}

	return cellText;
}

function makeFirstTr() {
	const firstRow = [''];

	for (let i = 0; i < fullOlympics.length; i++) {
		firstRow.push(fullOlympics[i][0]);
	}

	return firstRow;
}

function createTr(arr) {
	return `<tr><td>${arr.join('</td><td>')}</tr>`;
}

const fullOlympics = fulfillOlympics(updateOlympicsData(olympic));

const trs = [];


for (let i = 0; i < sports.length; i++) {
	const tds = [sports[i][0]];

	for (let j = 0; j < fullOlympics.length; j++) {
		const winnersFinal = [];

		for (let k = 0; k < winners.length; k++) {

			if (winners[k][0] === sports[i][1] && fullOlympics[j].includes(winners[k][2])) {
				winnersFinal.push(winners[k]);
			}

		}

		tds.push(fulfillCell(winnersFinal));
	}

	trs.push(createTr(tds));

}

document.write(`<table>
                  ${createTr(makeFirstTr())}
		              ${trs.join('')}
               </table>`);