const CHEESEBURGER = 'cheeseburger';
const PRICE_OF_HAMBURGER = 10;
const PRICE_OF_CHEESEBURGER = 15;
const PRICE_OF_DOUBLE_CHEESE = 5;

const POTATO_MIDDLE = 'middle';
const POTATO_BIG = 'big';
const PRICE_OF_SMALL_POTATO = 10;
const PRICE_OF_MIDDLE_POTATO = 15;
const PRICE_OF_BIG_POTATO = 20;

const MAYONNAISE = 'mayonnaise';
const PRICE_OF_KETCHUP = 2;
const PRICE_OF_MAYONNAISE = 3;

let finalStringBurger = '';
let finalStringPotato = '';
let finalStringSauce = '';
let totalPrice = 0;

let chooseBurger = prompt('Choose your burger: hamburger or cheeseburger', 'hamburger');

if (chooseBurger) {
  chooseBurger = chooseBurger.replaceAll(` `, ``).toLowerCase();
}

if (!chooseBurger || chooseBurger !== CHEESEBURGER) { // or chooseBurger === null || chooseBurger === ''
  totalPrice = PRICE_OF_HAMBURGER;
  
  finalStringBurger = `<li>Burger 🍔: hamburger</li>`;
} else if (chooseBurger === CHEESEBURGER) {
  totalPrice = PRICE_OF_CHEESEBURGER;
 
  const doubleCheese = confirm('Would you like to add double cheese?');
 
  if (doubleCheese) {
    totalPrice += PRICE_OF_DOUBLE_CHEESE;
    finalStringBurger = `<li>Burger 🍔: double cheeseburger</li>`;
  } else {
    finalStringBurger = `<li>Burger 🍔: cheeseburger</li>`;
  }
}

const choosePotato = confirm('Would you like potato?');

if (choosePotato) {
  let typeOfPotato = prompt('Choose potato size: small/middle/big', 'small');

  if (typeOfPotato) {
    typeOfPotato = typeOfPotato.replaceAll(` `, ``).toLowerCase();
  }

  if (!typeOfPotato || (typeOfPotato !== POTATO_MIDDLE && typeOfPotato !== POTATO_BIG)) {  // or typeOfPotato === null || typeOfPotato === ''
    totalPrice += PRICE_OF_SMALL_POTATO;
    finalStringPotato = `<li>Potato 🍟: small</li>`;
  } else if (typeOfPotato === POTATO_MIDDLE) {
    totalPrice += PRICE_OF_MIDDLE_POTATO;
    finalStringPotato = `<li>Potato 🍟: middle</li>`;
  } else if (typeOfPotato === POTATO_BIG) {
    totalPrice += PRICE_OF_BIG_POTATO;
    finalStringPotato = `<li>Potato 🍟: big</li>`;
  }
}

const chooseSauce = confirm('Would you like sauce?');

if (chooseSauce) {
  let typeOfSauce = prompt('Choose sauce: ketchup or mayonnaise', 'ketchup');

  if (typeOfSauce) {
    typeOfSauce = typeOfSauce.replaceAll(` `, ``).toLowerCase();
  }

  if (!typeOfSauce || typeOfSauce !== MAYONNAISE) {     // or typeOfSauce === null || typeOfSauce === ''
    totalPrice += PRICE_OF_KETCHUP;
    finalStringSauce = `<li>Sauce 🧂: ketchup </li>`;
  } else {
    totalPrice += PRICE_OF_MAYONNAISE;
    finalStringSauce = `<li>Sauce 🧂: mayonnaise </li>`;
  }
}

document.write(`<h2>Your order:</h2>
	    <ul>
		    ${finalStringBurger}
		    ${finalStringPotato}
        ${finalStringSauce}
	    </ul>

	    <p>Price: $${totalPrice} </p>
    `);

