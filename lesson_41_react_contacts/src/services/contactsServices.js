const API = 'https://639f82247aaf11ceb89c042c.mockapi.io/contacts';

export const getItems = () => fetch(API).then(data => data.json());

export const saveItem = (id, obj) => {
  fetch(API + `/${id}`, {
    method: "PUT",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(obj)
  }).then(data => data.json());
}

export const deleteItem = id => {
  fetch(API + `/${id}`, {
    method: "DELETE",
  }).then(data => data.json());
}

export const addItem = (obj) => fetch(API, {
  method: "POST",
  headers: {
    "Content-type": "application/json"
  },
  body: JSON.stringify(obj)
}).then(data => data.json());