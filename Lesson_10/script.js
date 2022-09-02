const sports = [
	['🤺', 'fencing'],
	['⛸', 'figure skating'],
	['⛷', 'skier'],
	['🏂', 'snowboarder'],
	['🏌', 'golfing'],
	['🚣', 'rowing boat'],
	['🏊', 'swimming'],
	['🤸', 'gymnastics'],
	['🤾', 'handball']
];

const winners = [
	['fencing', '🥇', 'fr'],
	['fencing', '🥈', 'it'],
	['fencing', '🥉', 'us'],

	['figure skating', '🥇', 'ca'],
	['figure skating', '🥈', 'fr'],
	['figure skating', '🥉', 'us'],

	['skier', '🥇', 'no'],
	['skier', '🥈', 'us'],
	['skier', '🥉', 'fr'],

	['snowboarder', '🥇', 'us'],
	['snowboarder', '🥈', 'jp'],
	['snowboarder', '🥉', 'au'],

	['golfing', '🥇', 'gb'],
	['golfing', '🥈', 'se'],
	['golfing', '🥉', 'us'],

	['rowing boat', '🥇', 'us'],
	['rowing boat', '🥈', 'ml'],
	['rowing boat', '🥉', 'ro'],

	['swimming', '🥇', 'us'],
	['swimming', '🥈', 'gb'],
	['swimming', '🥉', 'au'],

	['gymnastics', '🥇', 'it'],
	['gymnastics', '🥈', 'fr'],
	['gymnastics', '🥉', 'ua'],

	['handball', '🥇', 'dk'],
	['handball', '🥈', 'ke'],
	['handball', '🥉', 'de'],
];

const olympic = ['🔵', '⚫', '🔴', '🟡', '🟢'];
// Європа — синій, Африка — чорний, Америка — червоний, Азія — жовтий, Австралія — зелений

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
	['fr', '🇫🇷'],
	['it', '🇮🇹'],
	['us', '🇺🇸'],
	['ca', '🇨🇦'],
	['no', '🇳🇴'],
	['jp', '🇯🇵'],
	['au', '🇦🇺'],
	['gb', '🇬🇧'],
	['se', '🇸🇪'],
	['ro', '🇷🇴'],
	['ua', '🇺🇦'],
	['dk', '🇩🇰'],
	['de', '🇩🇪'],
	['ke', '🇰🇪'],
	['ml', '🇲🇱']
];

function updateOlympicsData(olympicArr) {
	const resultArray = [];

	for (let i = 0; i < olympicArr.length; i++) {
		switch (olympicArr[i]) {
			case '🔵':
				resultArray.push([olympicArr[i], 'Europe']);
				break;
			case '⚫':
				resultArray.push([olympicArr[i], 'Africa']);
				break;
			case '🔴':
				resultArray.push([olympicArr[i], 'America']);
				break;
			case '🟡':
				resultArray.push([olympicArr[i], 'Asia']);
				break;
			case '🟢':
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
			cellText += `${findFlag(winnersFinal[m][2])} – ${winnersFinal[m][1]}`;
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