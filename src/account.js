import './account.css';

import {ApiMyServer} from '../scripts/apimyserver.js';
import {News} from '../scripts/news.js';
import {NewsList} from '../scripts/newslist.js';


console.log('dfdfd');


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


    // загрузка сохраненных новостей
    if (isAuth) {
        news.getSavedNews()
            .then((newsData) => {
                const pageName = document.querySelector('.page').getAttribute('name');
                console.log(newsData.data)
                newsList.renderNews(newsData.data, pageName);
            })
            .catch(err => console.log(err));
    }
    

    

    



    


    

})();
