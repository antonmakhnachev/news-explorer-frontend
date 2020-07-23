import '../account.css';


import {MainApi} from '../js/api/MainApi.js';
import {News} from '../js/components/news.js';
import {NewsList} from '../js/components/newslist.js';
import {DisplayControl} from '../js/components/displayControl.js';
import { MAIN_API_OPTIONS } from '../js/constants/api-options.js';
import { getUserAuth } from '../js/utils/get-user-auth.js';
import { uniqueKeywords } from '../js/utils/unique-keywords.js';


(function (){    
    const newsPlace = document.querySelector('.news');
    const userAuth = getUserAuth();      
    
    const mainApi = new MainApi(MAIN_API_OPTIONS);
    const news = new News(mainApi);
    const newsList = new NewsList(newsPlace, news, mainApi);
    const displayControl = new DisplayControl();
       

    const buttonAuth = document.querySelector('.header__button');    
    const buttonMobileMenu = document.querySelector('.header__mobile-icon');


    // управление мобильным меню
    let isOpened = 0;
    buttonMobileMenu.addEventListener('click', () => {
        displayControl.mobileMenuArticles(buttonMobileMenu);
        
        // const mobileMenu = document.querySelector('.header__menu-mobile');
        // const header = document.querySelector('.header');
        // const siteName = document.querySelector('.header__site-name');
        // const menuText = document.querySelectorAll('.menu__text');

        // mobileMenu.classList.toggle('menu-mobile_is-opened');
        // header.classList.toggle('header_opened-menu');
        // siteName.classList.toggle('menu_is-opened');
        // buttonAuth.classList.toggle('menu_is-opened');
        // for (const text of menuText) {
        //     text.classList.toggle('menu_is-opened');
        // }        

        // if (isOpened === 0) {
        //     buttonMobileMenu.src = '../images/close_mobile.png';
        //     isOpened = 1;
        // } else {
        //     buttonMobileMenu.src = '../images/menu_open_white_theme.png';
        //     isOpened = 0;
        // }        
    })

    // массив с ключевыми словами
    // function uniqueKeywords (newsData) {
    //     const arr = new Array();      

    //     for (const news of newsData) {
    //         arr.push(news.keyword)
    //     }        
    //     return Array.from(new Set(arr));
    // }

    // загрузка сохраненных новостей
    if (userAuth) {        
        mainApi.getSavedNews()
            .then((newsData) => {
                const uniqueKeywords = uniqueKeywords(newsData.data);
                console.log(newsKeywords)
                displayControl.updateArticlesPage(newsData.data, uniqueKeywords, userAuth)

                const pageName = document.querySelector('.page').getAttribute('name');
                // const info = document.querySelector('.info');
                // const infoKeywords = document.createElement('p')
                // const uniqueWords = uniqueKeywords(newsData.data);
                // const logoutIcon = document.createElement('img');
                // const buttonAuth = document.getElementById('button_auth');
                // const userName = JSON.parse(isAuth).userName;
                // const infoTitle = document.querySelector('.info__title');
                //const savedNews = document.querySelector('.saved-news');              
                
                // logoutIcon.classList.add('header__logout-img');
                // logoutIcon.src = '../images/logout.png'

                // buttonAuth.textContent = userName;        
                // buttonAuth.appendChild(logoutIcon);
                // if (newsData.data.length === 0) {
                //     infoTitle.textContent = `${userName}, у вас нет сохранённых статей`
                //     savedNews.classList.remove('saved-news_is-opened');
                // } else {
                //     if (uniqueWords.length <= 3) {
                //         infoKeywords.innerHTML = `<p class="info__keyword">По ключевым словам: <span class="info__keyword-text">${uniqueWords}</span></p>`
                //         info.appendChild(infoKeywords);                   
                //     } else {
                //         const uniqueWordsPart = uniqueWords.slice(0, 2)
                //         infoKeywords.innerHTML = `<p class="info__keyword">По ключевым словам: <span class="info__keyword-text">${uniqueWordsPart}</span> и <span class="info__keyword-text">${uniqueWords.length - uniqueWordsPart.length} другим</span></p>`
                //         info.appendChild(infoKeywords);                    
                //     }

                //     infoTitle.textContent = `${userName}, у вас ${newsData.data.length} сохранённых статей`
                    //savedNews.classList.add('saved-news_is-opened');
                // }
                newsList.renderNews(newsData.data, pageName);
            })           
            .catch(err => console.log(err));
        

        

        
        

    }  


    

})();
