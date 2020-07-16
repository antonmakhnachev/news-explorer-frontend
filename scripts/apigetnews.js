export class ApiGetNews {
    constructor(options) {
        this.options = options;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }

        return res.json();
    };

    getNews(keyword) {
        return fetch(`${this.options.baseUrl}q=${keyword}&from=${this.options.from}&to=${this.options.to}&sortBy=publishedAt&apiKey=${this.options.apiKey}`)
        .then(res => this._getResponseData(res))
    }
}