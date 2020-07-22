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
        const newsFavor = document.createElement('button');
        const favorPlace = document.createElement('div');
        const authErr = document.createElement('p');        
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
        favorPlace.classList.add('news__favor-place');
        authErr.classList.add('news__auth-err');
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
                newsCard.appendChild(favorPlace);
                favorPlace.appendChild(newsFavor);
                favorPlace.appendChild(authErr);
                               

                newsImg.src = news.urlToImage;        
                newsDate.textContent = new Date(news.publishedAt).toDateString();
                newsTitle.textContent = news.title;
                newsText.textContent = news.description;
                newsSource.textContent = news.source.name;
                newsSource.href = news.url;  
                authErr.textContent = 'Войдите, чтобы сохранять статьи';        
            break;

            case 'account':
                newsCard.classList.add('news__card_is-opened');
                newsCard.appendChild(newsDel);
                // newsDel.appendChild(newsDelIcon);
                newsCard.appendChild(newsGroupName);
                newsGroupName.appendChild(newsGroupText);

                newsImg.src = news.image;
                newsDate.textContent = news.date;
                newsTitle.textContent = news.title;
                newsText.textContent = news.text;
                newsSource.textContent = news.source;
                newsSource.href = news.link;
                // newsDelIcon.src = '../images/trash.png';
                newsGroupText.textContent = news.keyword;

                newsCard.setAttribute('id', news._id);
                console.log(newsCard.getAttribute('id'))

            break;
        };        
        newsSource.target = '_blank';

        return newsCard;
    }

    save(event) {
        const news = event.target.closest('.news__card');
        const newsFavor = news.querySelector('.news__favor');
        const authErr = news.querySelector('.news__auth-err');
        const keyword = document.querySelector('.search__input');
        const isAuth = localStorage.getItem('user');

        if (!isAuth) {
            newsFavor.disabled = true;
            authErr.classList.add('news__auth-err_is-opened');

            return;
        }
        

        if (newsFavor.classList.contains('news__favor_is-favor')) {
            const newsId = news.getAttribute('id');            
            newsFavor.classList.remove('news__favor_is-favor')
            this.apiMyServer.deleteNews(newsId)
                .then((res) => console.log(res))
                .catch(err => console.log(err))
        } else {
            newsFavor.classList.add('news__favor_is-favor')
            this.apiMyServer.saveNews(news, keyword.value)
                .then((res) => {
                    const newsId = res.data._id;
                    news.setAttribute('id', newsId);
                    // console.log(news);
                })
                .catch(err => console.log(err));
        };        
    };

    getSavedNews() {
        return fetch(`${this.apiMyServer.options.baseUrl}/articles`, {            
            credentials: 'include'
        })
        .then(res => this._getResponseData(res))          
        .catch(err => console.log(err));
    };

    deleteSavedNews(event) {
        const newsId = event.target.closest('.news__card').id;        
        this.apiMyServer.deleteNews(newsId)
            .then(() => {
                document.getElementById(newsId).remove();                
            })          
            .catch(err => console.log(err)); 
    };

    
}