const TESLA_API = 'https://raw.githubusercontent.com/brightestsirius/Front-end-Pro-19/master/lesson_27/tesla.json';
const IMAGE_TESLA_API = 'https://mc-astro.github.io/tesla-roadster-colors/img';

const getTeslaData = async () => {
  try {
    const response = await fetch(`${TESLA_API}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
}

const createElement = (typeEl, dataEl) => {
  const element = document.createElement(typeEl);

  if ('classes' in dataEl) {
    element.classList.add(dataEl.classes);
  }

  if ('attrs' in dataEl) {
    Object.entries(dataEl.attrs).forEach(attr => element.setAttribute(attr[0], attr[1]));
    console.log(Object.entries(dataEl.attrs));
  }

  if ('html' in dataEl) {
    element.innerHTML = dataEl.html;
  }

  return element;
}

const renderTesla = (dataOfCars) => {
  const wrapper = createElement('div', { classes: 'wrapper' });
  const img = createElement('img', { classes: 'image', attrs: { 'src': `${IMAGE_TESLA_API}/${dataOfCars[0].img}.jpg`, 'alt': `${dataOfCars[0].title}` } });

  const h1 = createElement('h1', { classes: 'title', html: dataOfCars[0].title });
  const ul = createElement('ul', { classes: 'list' });

  dataOfCars.forEach(item => {
    const button = createElement('button', { classes: 'button', attrs: { 'data-color': item.img, 'data-title': item.title, 'style': `background: ${item.color};` } });

    const li = document.createElement('li');

    ul.appendChild(li).appendChild(button);
  });

  document.body.append(wrapper);
  wrapper.append(img, h1, ul);

  ul.addEventListener('click', function (event) {
    const button = event.target.closest('button');

    if (button) {
      const buttons = document.querySelectorAll('button');
      buttons.forEach((element) => {
        element.classList.remove('current');
      });

      const img = document.querySelector('.image');
      img.setAttribute('src', `${IMAGE_TESLA_API}/${button.dataset.color}.jpg`);
      img.setAttribute('alt', button.dataset.title);

      const h1 = document.querySelector('.title');
      h1.innerText = button.dataset.title;

      button.classList.add('current');
    }
  });
}

(async function () {
  const data = await getTeslaData();
  renderTesla(data);
})();