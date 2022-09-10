const obj = {
	x: 10,
	y: 20,
	inner: {
		x: 20,
		z: 30
	},
	foo2: {
		k: 23,
		p: 13
	}
}

function convert(object, newObject = {}) {
	for (let key in object) {

		if (typeof object[key] === 'object') {
			convert(object[key], newObject);
		} else {
			newObject[key] = object[key];
		}

	}

	return newObject;
}

console.log(convert(obj));