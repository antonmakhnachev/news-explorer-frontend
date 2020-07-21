export class News {
    constructor(apiMyServer) {
        this.apiMyServer = apiMyServer;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
        }

        return res.json();
    };




    createNews(news) {        

        const newsCard = document.createElement('div');
        const newsImg = document.createElement('img');
        const newsFavor = document.createElement('div');
        const newsFavorIcon = document.createElement('img');
        const newsDate = document.createElement('p');
        const newsTitle = document.createElement('h3');
        const newsText = document.createElement('p');
        const newsSource = document.createElement('a');

        newsCard.classList.add('news__card');
        newsImg.classList.add('news__img');
        newsFavor.classList.add('news__favor');
        newsFavorIcon.classList.add('news__favor-icon');
        newsDate.classList.add('news__date');
        newsTitle.classList.add('news__title');
        newsText.classList.add('news__text');
        newsSource.classList.add('news__source');

        newsCard.appendChild(newsImg);
        newsCard.appendChild(newsFavor);
        newsFavor.appendChild(newsFavorIcon);
        newsCard.appendChild(newsDate);
        newsCard.appendChild(newsTitle);
        newsCard.appendChild(newsText);
        newsCard.appendChild(newsSource);

        newsImg.src = news.urlToImage;
        newsFavorIcon.src = '../images/bookmark.png'
        newsDate.textContent = new Date(news.publishedAt).toDateString();
        newsTitle.textContent = news.title;
        newsText.textContent = news.description;
        newsSource.textContent = news.source.name;
        newsSource.href = news.url;
        newsSource.target = '_blank';

        return newsCard;
    }

    saveNews(event) {
        const card = event.target.closest('.news__card');
        const keywordValue = document.querySelector('.search__input');
        
        return fetch(`${this.apiMyServer.options.baseUrl}/articles`, {
            method: 'POST',
            credentials: 'include',
            headers: this.apiMyServer.options.headers,
            body: JSON.stringify({
                keyword: keywordValue.value,
                title: card.querySelector('.news__title').textContent,
                text: card.querySelector('.news__text').textContent,
                date: card.querySelector('.news__date').textContent.toString(),
                source: card.querySelector('.news__source').textContent,
                link: card.querySelector('.news__source').href,
                image: card.querySelector('.news__img').src      
            })
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }

    getSavedNews() {
        return fetch(`${this.apiMyServer.options.baseUrl}/articles`, {            
            credentials: 'include'
        })
        .then(res => this._getResponseData(res))          
        .catch(err => console.log(err));
    }

    
}