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




    createNews(news, pageName) {        

        const newsCard = document.createElement('div');
        const newsImg = document.createElement('img');
        const newsFavor = document.createElement('div');
        const newsFavorIcon = document.createElement('img');
        const newsDate = document.createElement('p');
        const newsTitle = document.createElement('h3');
        const newsText = document.createElement('p');
        const newsSource = document.createElement('a');
        const newsDel = document.createElement('div');
        const newsDelIcon = document.createElement('img');
        const newsGroupName = document.createElement('div');
        const newsGroupText = document.createElement('p');



        newsCard.classList.add('news__card');
        newsImg.classList.add('news__img');
        newsFavor.classList.add('news__favor');
        newsFavorIcon.classList.add('news__favor-icon');
        newsDate.classList.add('news__date');
        newsTitle.classList.add('news__title');
        newsText.classList.add('news__text');
        newsSource.classList.add('news__source');
        newsDel.classList.add('news__del');
        newsDelIcon.classList.add('news__del-icon');
        newsGroupName.classList.add('news__group-name');
        newsGroupText.classList.add('news__group-text');


        newsCard.appendChild(newsImg);        
        newsCard.appendChild(newsDate);
        newsCard.appendChild(newsTitle);
        newsCard.appendChild(newsText);
        newsCard.appendChild(newsSource);

        switch (pageName) {
            case 'main':
                newsCard.appendChild(newsFavor);
                newsFavor.appendChild(newsFavorIcon);

                newsImg.src = news.urlToImage;        
                newsDate.textContent = new Date(news.publishedAt).toDateString();
                newsTitle.textContent = news.title;
                newsText.textContent = news.description;
                newsSource.textContent = news.source.name;
                newsSource.href = news.url;
                newsFavorIcon.src = '../images/bookmark.png';
                
            break;

            case 'account':
                newsCard.classList.add('news__card_is-opened');
                newsCard.appendChild(newsDel);
                newsDel.appendChild(newsDelIcon);
                newsCard.appendChild(newsGroupName);
                newsGroupName.appendChild(newsGroupText);

                newsImg.src = news.image;
                newsDate.textContent = news.date;
                newsTitle.textContent = news.title;
                newsText.textContent = news.text;
                newsSource.textContent = news.source;
                newsSource.href = news.link;
                newsDelIcon.src = '../images/trash.png';
                newsGroupText.textContent = news.keyword;

                newsCard.setAttribute('id', news._id);

            break;
        };        
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

    deleteSavedNews(news) {
        const newsId = event.target.id //news.id;
        return fetch(`${this.apiMyServer.options.baseUrl}/articles/:${newsId}`, {            
            method: 'DELETE',
            credentials: 'include'
        })
        .then(res => console.log(res))          
        .catch(err => console.log(err)); 
    }

    
}