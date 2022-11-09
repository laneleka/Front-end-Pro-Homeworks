const TABLE_CAPTIONS = ['Name', 'Comics', 'Favourite', 'Actions'];
const API = 'https://63693f7228cd16bba71904e4.mockapi.io';

class Requests {
    async getHeroes() {
        try {
            const response = await fetch(`${API}/heroes`);
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async getUniverses() {
        try {
            const response = await fetch(`${API}/universes`);
            return await response.json();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    async postHero(data) {
        try {
            const response = await fetch(`${API}/heroes`, {
                method: `POST`,
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            return await response.json();
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    async putFavourite(id, mark) {
        try {
            const response = await fetch(`${API}/heroes/${id}`, {
                method: 'PUT',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ favourite: mark })
            })
            return await response.json();
        }
        catch (error) {
            console.error(error);
            return {};
        }
    }

    async deleteHero(id) {
        try {
            const response = await fetch(`${API}/heroes/${id}`, { method: `DELETE` });
            return await response.json();
        }
        catch (error) {
            console.error(error);
            return {};
        }
    }
}

class Table {
    constructor(requests, captions, nameTable) {
        this.requests = requests;
        this.captions = captions;
        this.nameTable = nameTable;
        this.data = [];

        this.tBody = null;
        this.tHead = null;
        this.tCaption = null;
    }

    async initTable() {
        this.data = await this.requests.getHeroes();
        this.renderTable();
    }

    createInnerElementsOfTable() {
        this.tCaption = document.createElement('caption');
        this.tCaption.innerText = this.nameTable;

        this.tHead = document.createElement('thead');
        this.tHead.innerHTML = `<tr>${this.captions.map(caption => `<th>${caption}</th>`).join('')}</tr>`;

        this.tBody = document.createElement('tbody');
        this.data.forEach((item) => this.tBody.appendChild(this.createRow(item)));
    }

    createColumn(element) {
        const td = document.createElement('td');

        if (typeof element === 'string') {
            td.innerHTML = element;
        } else {
            td.append(element);
        }

        return td;
    }

    createDeleteButton() {
        const button = document.createElement('button');
        button.className = 'btn btn-primary';

        button.innerHTML = 'Delete';

        button.addEventListener('click', (e) => {
            e.preventDefault();
        
            const parent = e.target.parentNode.parentNode;
            const parentId = parent.dataset.id;
        
            requests.deleteHero(parentId);
        
            const element = document.querySelector(`table [data-id="${parentId}"]`);
        
            if (element) {
                element.remove();
            }
        });

        return button;
    }

    createRow(item) {
        const row = document.createElement('tr');
        row.dataset.id = item.id;

        row.append(this.createColumn(item.name));
        row.append(this.createColumn(item.comics));
        row.append(this.createColumn(this.createFavourite(item.favourite)));
        row.append(this.createColumn(this.createDeleteButton()));

        return row;
    }

    renderRow(item) {
        this.tBody.append(this.createRow(item))
    }

    createFavourite(mark) {
        const label = document.createElement('label');
        label.className = 'form-label';

        label.addEventListener('change', (e) => {
            e.preventDefault();
            const parent = e.target.parentNode.parentNode.parentNode;
            const parentId = parent.dataset.id;
        
            if (parentId) {
                requests.putFavourite(parentId, Boolean(e.target.checked));
            }
        });

        label.innerHTML = `<input class="form-check-input" type="checkbox" value="${mark}" name="favourite" ${mark ? 'checked' : ''}>`;
              
        return label;
    }

    renderTable() {
        const tableBlock = document.createElement('table');
        document.body.prepend(tableBlock);
        tableBlock.id = 'tableInfo';
        tableBlock.className = 'table table-bordered caption-top';
    
        this.createInnerElementsOfTable();

        tableBlock.append(this.tCaption, this.tHead, this.tBody);
    }
}

const requests = new Requests();
const table = new Table(requests, TABLE_CAPTIONS, 'Heroes');

table.initTable();

const renderOptionsComicsSelect = async () => {
    const universesData = await requests.getUniverses();

    const heroComicsSelect = document.querySelector('#heroComics');

    if (heroComicsSelect) {
        heroComicsSelect.innerHTML = universesData
            .map(item => `<option value="${item.name}">${item.name}</option>`)
            .join('');
    }
}

const submitAddHeroForm = () => {
    const heroForm = document.querySelector('#addHero');
    const heroName = document.querySelector(`#heroName`);
    const heroFavourite = document.querySelector(`#heroFavourite`);
    const heroComicsSelect = document.querySelector(`#heroComics`);

    heroForm.addEventListener('submit', async (e) => {
        e.preventDefault();


        if (!(heroForm && heroName && heroFavourite && heroComicsSelect)) {
            return;
        }

        const heroesData = await requests.getHeroes();
        const isHeroNotExist = heroesData.every(hero => hero.name !== heroName.value);

        if (isHeroNotExist) {
            const newHero = await requests.postHero({
                name: heroName.value,
                comics: heroComicsSelect.value,
                favourite: heroFavourite.checked ? true : false
            })

            table.renderRow(newHero);
        } else {
            console.log('This hero has already existed');
        }
    })
}

renderOptionsComicsSelect();
submitAddHeroForm();