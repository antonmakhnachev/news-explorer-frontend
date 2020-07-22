export class NewsList {
    constructor(container, news, apiMyServer) {
        this.container = container;
        this.news = news;
        this.apiMyServer = apiMyServer;
    };

    addNews(newsData, pageName) {
        const newsElement = this.news.createNews(newsData, pageName);
        this.container.appendChild(newsElement);
        
        switch (pageName) {
            case 'main':
                newsElement
                    .querySelector('.news__favor')
                    .addEventListener('click', this.news.save.bind(this))                    
            break;
            case 'account':
                newsElement
                    .querySelector('.news__del')
                    .addEventListener('click', this.news.deleteSavedNews.bind(this))                    
            break;
        };      
    };


    renderNews(newsList, pageName) {
        for (const newsData of newsList) {
            this.addNews(newsData, pageName);            
        };
    };

    showMoreNews() {
        const cardList = document.querySelectorAll('.news__card');
        let i = 0;

        for (const card of cardList) {
            if (!card.classList.contains('news__card_is-opened')) {
                if (i < 3) {
                    card.classList.add('news__card_is-opened');
                    i++;
                };
            };                
        };        
    };
};