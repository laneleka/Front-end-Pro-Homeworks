class Bulka{
	constructor(name, size){
			this.name = name;
			this.size = size;
			this.ingredients = ['cutlet', 'salada', 'tomato'];
	}

	setAdditionalIngredients(...addIngredients){
			this.ingredients.push(...addIngredients);
	}
}

class Cheeseburger extends Bulka{
	constructor(name, size){
		super(name, size);
		this.ingredients.push('cheese');
	}
}

const humburger = new Bulka('Humburger', 'small');
humburger.setAdditionalIngredients('egg', 'onion');

const myCheeseburger = new Cheeseburger('Cheeseburger', 'small');
myCheeseburger.setAdditionalIngredients('egg', 'onion');

console.log(humburger);
console.log(myCheeseburger);
