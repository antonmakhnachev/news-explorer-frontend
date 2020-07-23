export class ApiMyServer {
    constructor(options) {
        this.options = options;
    };

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
    };

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
    };

    saveNews(news, keyword) {
        return fetch(`${this.options.baseUrl}/articles`, {
            method: 'POST',
            credentials: 'include',
            headers: this.options.headers,
            body: JSON.stringify({
                keyword: keyword.value,
                title: news.querySelector('.news__title').textContent,
                text: news.querySelector('.news__text').textContent,
                date: news.querySelector('.news__date').textContent.toString(),
                source: news.querySelector('.news__source').textContent,
                link: news.querySelector('.news__source').href,
                image: news.querySelector('.news__img').src      
            })
        })
        .then(res => this._getResponseData(res))
    };

    deleteNews(newsId) {
        return fetch(`${this.options.baseUrl}/articles/${newsId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: this.options.headers            
        })
        .then(res => this._getResponseData(res))
    }



    
};


