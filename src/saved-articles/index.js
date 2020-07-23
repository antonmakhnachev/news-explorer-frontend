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

    // открытие формы авторизации
    buttonAuth.addEventListener('click', () => {
        displayControl.logout();
        document.location.href = '/'
        locate.reload();          
    });

    // управление мобильным меню    
    buttonMobileMenu.addEventListener('click', () => {
        displayControl.mobileMenuArticles(buttonMobileMenu);       
    });
    
    // загрузка сохраненных новостей
    if (userAuth) {
        console.log(userAuth)        
        mainApi.getSavedNews()
            .then((newsData) => {
                const keywordsArray = uniqueKeywords(newsData.data);
                const pageName = document.querySelector('.page').getAttribute('name');                
                displayControl.updateArticlesPage(newsData.data, keywordsArray, userAuth)               
                newsList.renderNews(newsData.data, pageName);
            })           
            .catch(err => console.log(err));
    }
})();
