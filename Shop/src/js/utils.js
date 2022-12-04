const getLocalStorage = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch(error) {
    console.error(error);
  }
}

const setLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
const removeLocalStorage = (key) => localStorage.removeItem(key);

class Element {
  constructor(nameTag = 'div', options) {
    this.element = document.createElement(nameTag);

    if (options?.classes && Array.isArray(options.classes)) {
      this.element.classList.add(...options.classes);
    } else if (options?.classes && typeof options.classes === 'string') {
      this.element.classList.add(options.classes);
    }

    if (options?.attributes) {
      Object.keys(options.attributes).forEach(key => {
        this.element.setAttribute(key, options.attributes[key]);
      });
    }
  }

  setHTML(html) {
    this.element.innerHTML = html;
    return this;
  }
}

const render = (selector, element) => {
  const selectedElement = document.querySelector(selector);

  if (!selectedElement) {
    return;
  }

  if (Array.isArray(element)) {
    selectedElement.append(...element);
  } else {
    selectedElement.append(element);
  }
}

const groupedByCategory = (products) => {
  const categories = {};

  products.forEach(product => {
    if (categories[product.category]) {
      categories[product.category].push(product);
    } else {
      categories[product.category] = [product];
    }
  });

  return categories;
};

const getSalePrice = (price, salePrice) => {
  return Math.round(price - price * (salePrice / 100));
}

const getCountPrice = (product) => {
  return product.sale ? getSalePrice(product.price, product.salePercent) * product.count : product.price * product.count;
}