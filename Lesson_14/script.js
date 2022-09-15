const vegetables = [
	{
		name: `tomato`,
		icon: `🍅`,
		price: 2.3
	},
	{
		name: `carrot`,
		icon: `🥕`,
		price: 1.5
	},
	{
		name: `corn`,
		icon: `🌽`,
		price: 2.78,
		season: true
	}
];

const fruits = [
	{
		name: `watermelon`,
		icon: `🍉`,
		price: 7.7,
		season: true
	},
	{
		name: `cherries`,
		icon: `🍒`,
		price: 8.5,
		season: true
	},
	{
		name: `pineapple`,
		icon: `🍍`,
		price: 9.8
	}
];

const product = {
	getPrice() {
		const priceProduct = Object.hasOwn(this, 'season') ? this.price * this.seasonKoef : this.price;
		return priceProduct.toFixed(2);
	},
	getInfo() {
		return `Product: ${this.icon} ${this.name}. Type: ${this.type}. Price: $${this.getPrice(this.price)}.`
	}
}

const vegetable = Object.create(product);
vegetable.type = `Vegetable`;
vegetable.seasonKoef = 1.3;

const fruit = Object.create(product);
fruit.type = `Fruit`;
fruit.seasonKoef = 2;

function makePrototype(arr, objectProto) {
	return arr
		.map(item => {
			const arrObjectProto = Object.create(objectProto);
			Object.assign(arrObjectProto, item);

			return arrObjectProto;
		});
}

function renderList(arr) {
	const arrLis = [];
	arr.forEach(item => arrLis.push(`<li>${item.getInfo()}</li>`));

	return `<ul>${arrLis.join('')}</ul>`;
}

const vegetablesHasProto = makePrototype(vegetables, vegetable);
const fruitsHasProto = makePrototype(fruits, fruit);

document.write(`${renderList(vegetablesHasProto)}
                ${renderList(fruitsHasProto)}
								`);