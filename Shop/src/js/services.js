const BASE_URL = 'https://634e9f834af5fdff3a625f84.mockapi.io';

class HTTPService {
  constructor(url = BASE_URL) {
    this.url = url;
  }

  async get(url) {
    try {
      const response = await fetch(`${this.url}/${url}`, { method: 'GET' });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async post(url, body) {
    try {
      const response = await fetch(`${this.url}/${url}`, { method: 'POST', body: JSON.stringify(body),  headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async put(url, body) {
    try {
      const response = await fetch(`${this.url}/${url}`, { method: 'PUT', body: JSON.stringify(body), headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }, });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async delete(url) {
    try {
      const response = await fetch(`${this.url}/${url}`, { method: 'DELETE' });
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }
}

class ProductService extends HTTPService {
  constructor() {
    super();
  }

  async getAll() {
    return await this.get('products');
  }
}

class UsersService extends HTTPService {
  constructor() {
    super();
  }

  async getAll() {
    return await this.get('users');
  }

  async create(user) {
    return await this.post('users', user);
  }

  async update(user) {
    return await this.put(`users/${user.id}`, user);
  }

  async deleteUser(id) {
    return await this.delete(`users/${id}`);
  }
}
