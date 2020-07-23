//import { getUserAuth } from '../utils/get-user-auth.js';
export class News {
    constructor(mainApi) {
        this.mainApi = mainApi;        
    };

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
                newsCard.appendChild(newsGroupName);
                newsGroupName.appendChild(newsGroupText);

                newsImg.src = news.image;
                newsDate.textContent = news.date;
                newsTitle.textContent = news.title;
                newsText.textContent = news.text;
                newsSource.textContent = news.source;
                newsSource.href = news.link;                
                newsGroupText.textContent = news.keyword;

                newsCard.setAttribute('id', news._id);
                console.log(newsCard.getAttribute('id'))

            break;
        };        
        newsSource.target = '_blank';

        return newsCard;
    };    

    save(event) {
        const news = event.target.closest('.news__card');
        const newsFavor = news.querySelector('.news__favor');
        const authErr = news.querySelector('.news__auth-err');
        const keyword = document.getElementById('keyword');
        const userAuth = JSON.parse(localStorage.getItem('user'));       

        if (!userAuth) {            
            authErr.classList.add('news__auth-err_is-opened');
            return;
        } else {
            authErr.classList.remove('news__auth-err_is-opened');
        };
        

        if (newsFavor.classList.contains('news__favor_is-favor')) {
            const newsId = news.getAttribute('id');            
            newsFavor.classList.remove('news__favor_is-favor');

            this.mainApi.deleteNews(newsId)
                .then((res) => console.log(res))
                .catch(err => console.log(err))
        } else {
            newsFavor.classList.add('news__favor_is-favor');
            this.mainApi.saveNews(news, keyword)
                .then((res) => {                    
                    news.setAttribute('id', res.data._id);                    
                })
                .catch(err => console.log(err));
        };        
    };    

    delete(event) {
        const newsId = event.target.closest('.news__card').id;            
        this.mainApi.deleteNews(newsId)
            .then(() => {
                document.getElementById(newsId).remove();
            })
            .catch(err => console.log(err))
    };    
};
  