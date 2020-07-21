export class ApiMyServer {
    constructor(options) {
        this.options = options;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }

        return res.json();
    };

    createUser(userData) {
        console.log({
            email: userData.email,
            password: userData.password,
            name: userData.name,
        })

        return fetch(`${this.options.baseUrl}/signup`, {
            method: 'POST',
            credentials: 'include',
            headers: this.options.headers,
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,
                name: userData.name,
            })
        })
      .then(res => this._getResponseData(res))
    }

    login(userData) {
        console.log({
            email: userData.email,
            password: userData.password,            
        })

        return fetch(`${this.options.baseUrl}/signin`, {
            method: 'POST',
            credentials: 'include',
            headers: this.options.headers,
            body: JSON.stringify({
                email: userData.email,
                password: userData.password,                
            })
        })
        .then(res => this._getResponseData(res))

    
    }

    
};


