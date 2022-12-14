const products = [
	['apple', 10],
	['banana', 8],
	['mango', 20],
	['grape', 18]
]

function summerValue(value) {
	return value * 0.8;
}

function winterValue(value) {
	return value * 2;
}

function getPrice(products, seasonFunc) {
	const copiedProducts = JSON.parse(JSON.stringify(products));
 
	let sumProducts = 0;
 
	copiedProducts.forEach(product => sumProducts += seasonFunc &&  typeof seasonFunc === 'function' ? seasonFunc(product[1]) : product[1]);
	
	return sumProducts;
}

console.log(getPrice(products, summerValue));
console.log(getPrice(products, winterValue));
console.log(getPrice(products));