export class NewsList {
    constructor(container, news) {
        this.container = container;
        this.news = news;
    }

    addNews(newsData) {
        const newsElement = this.news.createNews(newsData);
        this.container.appendChild(newsElement);
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