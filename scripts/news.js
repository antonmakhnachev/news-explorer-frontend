export class News {




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
        newsFavorIcon.src = '../images/icon/bookmark.png'
        newsDate.textContent = new Date(news.publishedAt).toDateString();
        newsTitle.textContent = news.title;
        newsText.textContent = news.description;
        newsSource.textContent = news.source.name;
        newsSource.href = news.url;
        newsSource.target = '_blank';

        return newsCard;
    }
}