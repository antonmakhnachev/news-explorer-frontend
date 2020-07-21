export class NewsList {
    constructor(container, news, apiMyServer) {
        this.container = container;
        this.news = news;
        this.apiMyServer = apiMyServer;
    }

    addNews(newsData) {
        const newsElement = this.news.createNews(newsData);
        this.container.appendChild(newsElement);
        // console.log(this.apiMyServer.baseUrl);
        newsElement
            .querySelector('.news__favor')
            .addEventListener('click', this.news.saveNews.bind(this))
    }


    renderNews(newsList) {
        for (const newsData of newsList) {
            this.addNews(newsData);            
        }
    }

    showMoreNews() {
        const cardList = document.querySelectorAll('.news__card');
        let i = 0;

        for (const card of cardList) {
            if (!card.classList.contains('news__card_is-opened')) {
                if (i < 3) {
                    card.classList.add('news__card_is-opened');
                    i++;
                }
            }                
        }        
    }
}