const USER_KEY_LS = 'user';
const USERS_KEY_LS = 'users';
const PRODUCTS_KEY_LS = 'products';
const ROUTES = {
  '/': initProductsPage,
  '/index.html': initProductsPage,
  '/login.html': initLoginPage,
  '/shoppingCart.html': initShoppingCartPage,
  '/account.html': initAccountPage,
}

const fulfillProducts = (user, items = user.shoppingCart) => {
  const products = getLocalStorage(PRODUCTS_KEY_LS);

  return items.map((item) => {
    const foundProduct = products.find(product => product.id === item.id);
    foundProduct.count = item.count;
    return foundProduct;
  });
}

const createProductElement = (product) => {
  const productElement = new Element('div', { attributes: {'data-id': product.id }, classes: 'product' });
  const user = getLocalStorage(USER_KEY_LS);

  productElement.setHTML(`
        <img src="images/products/${product.img}.png" class="product__img" alt=${product.title} height="80">
        <p class="product__title">${product.title}</p>
        ${product.sale ? `<div class="product__sale">
            <span class="product__sale--old">$${product.price}</span>
            <span class="product__sale--percent">-${product.salePercent}%</span>
        </div>` : ''}
        <div class="product__info">
            <span class="product__price">$${product.sale ? getSalePrice(product.price, product.salePercent) : product.price}</span>
            <button class="product__cart ${user?.shoppingCart?.some(shopItem => shopItem.id === product.id) ? 'product__cart--in' : ''}">
                <img src="images/shopping-cart.png" alt="shopping cart" height="20">
            </button>
        </div>
    `);

  return productElement;
}

const updateShoppingSum = (shoppingCart) => {
  const shoppingSumElement = document.querySelector('#orderSummaryTotal');
  shoppingSumElement.innerHTML = `$${shoppingCart.reduce((acc, item) => acc + getCountPrice(item), 0)}`;
}

const createCategoryElement = (category) => {
  const categoryElement = new Element('section', { classes: 'category', attributes: { 'data-category': category } });
  categoryElement.setHTML(`<h2>${category}</h2><div class="category__container"></div>`);
  return categoryElement;
}

const createRowOrderElement = (order) => {
  const rowElement = new Element('tr', { attributes: { 'data-id': order.id } });

  rowElement.setHTML(`
                <td>
                  <div class="item__info">
                    <img src="images/products/${order.img}.png" alt="Bus" height="100" />
                    <div>
                      <p class="item__info--title">${order.title}</p>
                    </div>
                  </div>
                </td>
                <td>$${order.price}</td>
                <td>${order.sale ? `<span class="item__sale">- ${order.salePercent}%</span>` : ''}</td>
                <td>${order.count}</td>
                <td>$${getCountPrice(order)}</td>
                `);

  return rowElement;
}

const createRowShoppingElement = (product) => {
  const rowElement = new Element('tr', { attributes: { 'data-id': product.id } });

  rowElement.setHTML(`
                <td>
                  <div class="item__info">
                    <img
                      src="images/products/${product.img}.png"
                      alt="Boat"
                      height="100"
                    />
                    <div>
                      <p class="item__info--title">${product.title}</p>
                    </div>
                  </div>
                </td>
                <td>$${product.price}</td>
                <td>${product.sale ? `<span class="item__sale">- ${product.salePercent}%</span>` : ''}</td>
                <td><input type="number" value="${product.count}" /></td>
                
                <td class="item__price-with-count">$${getCountPrice(product)}</td>
                <td>
                  <button class="item__remove">
                    <img src="images/delete.png" alt="delete" height="20" />
                  </button>
                </td>
    `);

  return rowElement;
}

const updateHeaderCount = (count) => {
  const cartCount = document.querySelector('#headerShoppingCartCount');
  cartCount.innerHTML = count;
}

const handleLogout = async () => {
  const usersService = new UsersService();
  const user = getLocalStorage(USER_KEY_LS);
  await usersService.update({ id: user.id, status: false });
  removeLocalStorage(USER_KEY_LS);
  window.location.href = '/';
}

const updateHeader = (user) => {
  const headerUserElement = document.querySelector('#headerUser');
  const headerLogoutElement = document.querySelector('#headerLogout');
  const shoppingCartElement = document.querySelector('#headerShoppingCart');

  if (user?.status) {
    headerLogoutElement.classList.add('active');
    headerUserElement.innerHTML = user.name;
    headerUserElement.setAttribute('href', 'account.html');
    shoppingCartElement.setAttribute('href', 'shoppingCart.html');
    updateHeaderCount(user.shoppingCart.length);

    headerLogoutElement.addEventListener('click', handleLogout);
  } else {
    headerLogoutElement.classList.remove('active');
    headerUserElement.innerHTML = 'Log in';
    headerUserElement.setAttribute('href', 'login.html');
    shoppingCartElement.setAttribute('href', 'login.html');
    updateHeaderCount(0);

    headerLogoutElement.removeEventListener('click', handleLogout);
  }
}

const initHeader = () => {
  const users = getLocalStorage(USERS_KEY_LS);
  const currentUser = getLocalStorage(USER_KEY_LS);
  const user = users.find(user => user.email === currentUser?.email);

  if (user) {
    setLocalStorage(USER_KEY_LS, user);
  }

  updateHeader(user);
}

const setFormError = (formElement, error) => {
  const errorElement = formElement.querySelector('.error');
  errorElement.innerHTML = error;
  errorElement.classList.add('active');
}

async function initProductsPage(usersService) {
  const products = getLocalStorage(PRODUCTS_KEY_LS);
  const groupedProducts = groupedByCategory(products);

  const categoryContainerElement = new Element('div', { classes: 'container', attributes: { 'id': 'categoriesContainer' } });
  render('main', categoryContainerElement.element);

  Object.keys(groupedProducts).forEach(category => {
    const categoryElement = createCategoryElement(category);

    render('#categoriesContainer', categoryElement.element);
    render(`[data-category="${category}"] .category__container`,
      groupedProducts[category].map(product => createProductElement(product).element));
  });

  document.addEventListener('click', async (event) => {
    const user = getLocalStorage(USER_KEY_LS);

    if (event.target.closest('.product__cart')) {
      if (!user?.status) {
        window.location.href = 'login.html';
        return;
      }

      const product = products.find(product => product.id === event.target.closest('.product').dataset.id);
      const shoppingCart = user.shoppingCart;
      const productInCart = shoppingCart.find(shopItem => shopItem.id === product.id);

      if (productInCart) {
        shoppingCart.splice(shoppingCart.indexOf(productInCart), 1);
      } else {
        shoppingCart.push({
          id: product.id,
          count: 1,
        });
      }

      const updatedUser = await usersService.update({ ...user, shoppingCart });
      setLocalStorage(USER_KEY_LS, updatedUser);

      event.target.closest('.product__cart').classList.toggle('product__cart--in');
      updateHeader(user);
    }
  });
}

async function initLoginPage(usersService) {
  const loginFormElement = document.querySelector('#loginForm');
  const registrationFormElement = document.querySelector('#registrationForm');

  loginFormElement.addEventListener('submit', async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const users = getLocalStorage(USERS_KEY_LS);

    const foundUser = users.find(user => user.email === form.get('email'));

    if (!foundUser) {
      setFormError(loginFormElement, 'Invalid email');
      return;
    }

    if (!users.some(user => user.password === form.get('password') && user.email === foundUser.email)) {
      setFormError(loginFormElement, 'Invalid password');
      return;
    }

    await usersService.update({ ...foundUser, status: true });
    setLocalStorage(USER_KEY_LS, foundUser);
    window.location.href = '/';
  });

  registrationFormElement.addEventListener('submit', async (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const users = getLocalStorage(USERS_KEY_LS);

    if (users.find(user => user.email === form.get('email'))) {
      setFormError(registrationFormElement, 'User with this email already exists');
      return;
    }

    if (form.get('password') !== form.get('passwordVerify')) {
      setFormError(registrationFormElement, 'Passwords do not match');
      return;
    }

    const createdUser = await usersService.create({
      name: form.get('name'),
      email: form.get('email'),
      password: form.get('password'),
      status: true
    });

    setLocalStorage(USER_KEY_LS, createdUser);
    window.location.href = '/';
  });
}

async function initAccountPage(usersService) {
  const user = getLocalStorage(USER_KEY_LS);

  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  const userInfoNameElement = document.querySelector('#userInfoName');
  const userInfoEmailElement = document.querySelector('#userInfoEmail');
  const deleteAcc = document.querySelector('#deleteAcc');

  userInfoNameElement.innerHTML = user.name;
  userInfoEmailElement.innerHTML = user.email;

  deleteAcc.addEventListener('click', async () => {
    await usersService.deleteUser(user.id);
    await handleLogout();
  });

  const orders = fulfillProducts(user, user.orders);

  orders.forEach(order => {
    render('#orderTable tbody', createRowOrderElement(order).element);
  });
}

async function initShoppingCartPage(usersService) {
  const user = getLocalStorage(USER_KEY_LS);

  if (!user?.status) {
    window.location.href = 'login.html';
    return;
  }

  const shoppingCart = fulfillProducts(user);

  updateShoppingSum(shoppingCart);

  shoppingCart.forEach(product => {
    const productElement = createRowShoppingElement(product);
    render('#shoppingCartTable tbody', productElement.element);
  });

  const table = document.querySelector('#shoppingCartTable');

  table.addEventListener('click', async (event) => {
    if (event.target.closest('.item__remove')) {
      const user = getLocalStorage(USER_KEY_LS);
      const productId = event.target.closest('tr').dataset.id;
      const filteredShoppingCart = shoppingCart
        .filter(product => product.id !== productId)
        .map((shoppingCartItem) => ({ id: shoppingCartItem.id, count: shoppingCartItem.count }));

      const updatedUser = await usersService.update({ ...user, shoppingCart: filteredShoppingCart });
      setLocalStorage(USER_KEY_LS, updatedUser);

      const updatedShoppingCart = fulfillProducts(updatedUser);

      updateShoppingSum(updatedShoppingCart);
      updateHeaderCount(updatedShoppingCart.length);
      event.target.closest('tr').remove();
    }
  });

  table.addEventListener('input', async (event) => {
    const user = getLocalStorage(USER_KEY_LS);
    const productId = event.target.closest('tr').dataset.id;

    const shoppingCart = fulfillProducts(user);

    const product = shoppingCart.find(shoppingCartItem => shoppingCartItem.id === productId);

    if (!product) {
      return;
    }

    const count = event.target.value;
    user.shoppingCart.splice(shoppingCart.indexOf(product), 1, { id: product.id, count: +count });
    const updatedUser = await usersService.update({ ...user, shoppingCart: user.shoppingCart });

    setLocalStorage(USER_KEY_LS, updatedUser);

    const updatedShoppingCart = fulfillProducts(user);

    updateShoppingSum(updatedShoppingCart);
    document.querySelector(`#shoppingCartTable [data-id="${product.id}"] .item__price-with-count`).innerHTML =
      `$${getCountPrice({ ...product, count: +count })}`;
  });

  const ordersForm = document.querySelector('#orderSummary');

  ordersForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const user = getLocalStorage(USER_KEY_LS);
    const shoppingCart = user.shoppingCart.map((shoppingCartItem) => ({ id: shoppingCartItem.id, count: shoppingCartItem.count }));
    const orders = [];

    const restOrders = user.orders.filter(order => !shoppingCart.find(shoppingCartItem => shoppingCartItem.id === order.id));

    shoppingCart.forEach(shoppingCartItem => {
      const order = user.orders.find(order => order.id === shoppingCartItem.id);

      if (order) {
        order.count = +order.count + +shoppingCartItem.count;
        orders.push(order);
      } else {
        orders.push(shoppingCartItem);
      }
    });

    const updatedUser = await usersService.update({
      ...user,
      shoppingCart: [],
      orders: [...orders, ...restOrders]
    });

    setLocalStorage(USER_KEY_LS, updatedUser);
    updateHeaderCount(0);
    window.location.href = 'account.html';
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const usersService = new UsersService();
  const productService = new ProductService();
  const users = await usersService.getAll();
  const products = await productService.getAll();

  setLocalStorage(USERS_KEY_LS, users);
  setLocalStorage(PRODUCTS_KEY_LS, products);

  initHeader();

  ROUTES[window.location.pathname] && ROUTES[window.location.pathname](usersService);
});
