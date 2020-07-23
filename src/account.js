import './account.css';

import {ApiMyServer} from '../scripts/apimyserver.js';
import {News} from '../scripts/news.js';
import {NewsList} from '../scripts/newslist.js';
import {DisplayControl} from '../scripts/displayControl.js'

(function (){
    const page = document.querySelector('.page');
    const newsPlace = document.querySelector('.news');
    const isAuth = localStorage.getItem('user');

    

    

    const isDev = 'development';
    
    const server = isDev === 'development' ? 'http://localhost:3000' : 'https://api.newsexplorer.gq';
       
    
    const apiMyServer = new ApiMyServer({
        baseUrl: server,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const news = new News(apiMyServer);
    const newsList = new NewsList(newsPlace, news, apiMyServer);
    const displayControl = new DisplayControl();   

    const buttonAuth = document.querySelector('.header__button');    
    const buttonMobileMenu = document.querySelector('.header__mobile-icon');


    // управление мобильным меню
    let isOpened = 0;
    buttonMobileMenu.addEventListener('click', () => {
        
        const mobileMenu = document.querySelector('.header__menu-mobile');
        const header = document.querySelector('.header');
        const siteName = document.querySelector('.header__site-name');
        const menuText = document.querySelectorAll('.menu__text');

        mobileMenu.classList.toggle('menu-mobile_is-opened');
        header.classList.toggle('header_opened-menu');
        siteName.classList.toggle('menu_is-opened');
        buttonAuth.classList.toggle('menu_is-opened');
        for (const text of menuText) {
            text.classList.toggle('menu_is-opened');
        }        

        if (isOpened === 0) {
            buttonMobileMenu.src = '../images/close_mobile.png';
            isOpened = 1;
        } else {
            buttonMobileMenu.src = '../images/menu_open_white_theme.png';
            isOpened = 0;
        }        
    })

    // массив с ключевыми словами
    function uniqueKeywords (newsData) {
        const arr = new Array();      

        for (const news of newsData) {
            arr.push(news.keyword)
        }        
        return Array.from(new Set(arr));
    }

    // загрузка сохраненных новостей
    if (isAuth) {        
        news.getSavedNews()
            .then((newsData) => {
                const pageName = document.querySelector('.page').getAttribute('name');
                const info = document.querySelector('.info');
                const infoKeywords = document.createElement('p')
                const uniqueWords = uniqueKeywords(newsData.data);
                const logoutIcon = document.createElement('img');
                const buttonAuth = document.getElementById('button_auth');
                const userName = JSON.parse(isAuth).userName;
                const infoTitle = document.querySelector('.info__title');
                const savedNews = document.querySelector('.saved-news');              
                
                logoutIcon.classList.add('header__logout-img');
                logoutIcon.src = '../images/logout.png'

                buttonAuth.textContent = userName;        
                buttonAuth.appendChild(logoutIcon);
                if (newsData.data.length === 0) {
                    infoTitle.textContent = `${userName}, у вас нет сохранённых статей`
                    savedNews.classList.remove('saved-news_is-opened');
                } else {
                    if (uniqueWords.length <= 3) {
                        infoKeywords.innerHTML = `<p class="info__keyword">По ключевым словам: <span class="info__keyword-text">${uniqueWords}</span></p>`
                        info.appendChild(infoKeywords);                   
                    } else {
                        const uniqueWordsPart = uniqueWords.slice(0, 2)
                        infoKeywords.innerHTML = `<p class="info__keyword">По ключевым словам: <span class="info__keyword-text">${uniqueWordsPart}</span> и <span class="info__keyword-text">${uniqueWords.length - uniqueWordsPart.length} другим</span></p>`
                        info.appendChild(infoKeywords);                    
                    }

                    infoTitle.textContent = `${userName}, у вас ${newsData.data.length} сохранённых статей`
                    savedNews.classList.add('saved-news_is-opened');
                }
                newsList.renderNews(newsData.data, pageName);
            })           
            .catch(err => console.log(err));
        

        

        
        

    }  


    

})();
