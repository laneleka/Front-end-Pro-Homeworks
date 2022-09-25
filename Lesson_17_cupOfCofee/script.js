const COFFEE_TYPES = {
    Espresso: [
        {
            title: `Ristretto`,
            ingredients: {
                espresso: 20
            }
        },
        {
            title: `Espresso`,
            ingredients: {
                espresso: 60
            }
        },
        {
            title: `Lungo`,
            ingredients: {
                espresso: 100
            }
        },
        {
            title: `Americano`,
            ingredients: {
                espresso: 40,
                water: 60
            }
        }
    ],
    EspressoMilk: [
        {
            title: `Macchiato`,
            ingredients: {
                espresso: 20,
                "milk foam": 10
            }
        },
        {
            title: `Flat White`,
            ingredients: {
                espresso: 55,
                "milk foam": 45
            }
        },
        {
            title: `Cappuccino`,
            ingredients: {
                espresso: 20,
                milk: 20,
                "milk foam": 15
            }
        },
        {
            title: `Latte`,
            ingredients: {
                espresso: 20,
                milk: 20,
                "milk foam": 20
            }
        },
        {
            title: `Mocha`,
            ingredients: {
                "chocolate syrop": 15,
                espresso: 15,
                milk: 18,
                "milk foam": 15
            }
        }
    ],
    Alcoholic: [
        {
            title: `Irish Coffee`,
            ingredients: {
                espresso: 50,
                whiskey: 10,
                "whipped cream": 40
            }
        },
        {
            title: `Corretto`,
            ingredients: {
                espresso: 90,
                brandy: 10
            }
        },
        {
            title: `Baileys Hot Coffee`,
            ingredients: {
                espresso: 30,
                "warm milk": 20,
                "baileys irish cream": 30
            }
        }
    ],
    Dessert: [
        {
            title: `Affogato`,
            ingredients: {
                espresso: 25,
                "ice cream": 20,
                "whipped cream": 10,
                chocolate: 10
            }
        },
        {
            title: `Frappe`,
            ingredients: {
                espresso: 30,
                ice: 10,
                milk: 50
            }
        },
        {
            title: `Glace`,
            ingredients: {
                espresso: 50,
                "grated chocolate": 10,
                "ice cream": 30
            }
        }
    ]
}

class Coffee {
    constructor(coffee) {
        Object.assign(this, coffee);
    }

    getCoffeeIngredients(ingredients) {
        let renderIngredients = '';

        for (let ingredient in ingredients) {
            const className = ingredient.replaceAll(' ', '__');

            renderIngredients += `<p style="height: ${ingredients[ingredient]}%" class="ingredient ${className}">${ingredient}</p>`;
        }

        return renderIngredients;
    }

    makeCoffee(classCoffee = '') {
        return `<div class="cup">
                    <div class="coffee ${classCoffee}">
                        <div class="coffee__ingredients">
                        ${this.getCoffeeIngredients(this.ingredients)}
                        </div>
                    </div>
                    <p class="coffee__title">${this.title}</p>
                 </div>`;
    }
}

class Espresso extends Coffee {
    constructor(coffee) {
        super(coffee);
    }

    makeCoffee() {
        return super.makeCoffee('coffee--espresso');
    }
}

class EspressoMilk extends Coffee {
    constructor(coffee) {
        super(coffee);
    }

    makeCoffee() {
        return super.makeCoffee('coffee--espressoMilk');
    }
}

class Alcoholic extends Coffee {
    constructor(coffee) {
        super(coffee);
    }

    makeCoffee() {
        return super.makeCoffee('coffee--alcoholic');
    }
}

class Dessert extends Coffee {
    constructor(coffee) {
        super(coffee);
    }

    makeCoffee() {
        return super.makeCoffee('coffee--dessert');
    }
}

const renderDefaultCoffee = new Coffee(
    {
        title: `Default Coffee`,
        ingredients: {
            espresso: 50,
            whiskey: 10,
            "whipped cream": 40
        }
    }
).makeCoffee();

const NAMES_OF_COFFEE = {
    Espresso: coffee => new Espresso(coffee),
    EspressoMilk: coffee => new EspressoMilk(coffee),
    Alcoholic: coffee => new Alcoholic(coffee),
    Dessert: coffee => new Dessert(coffee)
};

function renderCoffee() {
    let final = '';

    for (let coffee in COFFEE_TYPES) {
        COFFEE_TYPES[coffee].forEach(coffeeItem => final += NAMES_OF_COFFEE[coffee](coffeeItem).makeCoffee());
    }

    return final;
};

document.write(`<section class="cups">${renderDefaultCoffee}${renderCoffee()}</section>`);
