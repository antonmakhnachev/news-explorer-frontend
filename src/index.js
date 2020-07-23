import './index.css';

import {Popup} from './js/components/popup.js';
import {FormValidator} from './js/components/formvalidator.js';
import {NewsApi} from './js/api/NewsApi.js';
import {MainApi} from './js/api/MainApi.js';
import {News} from './js/components/news.js';
import {NewsList} from './js/components/newslist.js';
import {DisplayControl} from './js/components/displayControl.js'
import { MAIN_API_OPTIONS, NEWS_API_OPTIONS } from './js/constants/api-options.js';
import { getUserAuth } from './js/utils/get-user-auth.js';


(function (){
    console.log(MAIN_API_OPTIONS)
    console.log(NEWS_API_OPTIONS)
    
    const formAuth = document.forms.form_auth;
    const formReg = document.forms.form_reg;
    const formSearch = document.forms.form_search;

    const newsPlace = document.querySelector('.news');
    const msgLink = document.querySelector('.msg__link');
    const buttonAuth = document.getElementById('button_auth');
    const buttonClose = document.querySelectorAll('.popup__close');    
    const searchResultButton = document.querySelector('.search-result__button');
    const buttonMobileMenu = document.querySelector('.header__mobile-icon');
    const openFormByLink = document.querySelectorAll('.form__link');
    const forms = document.querySelectorAll('.form');
    
    const newsApi = new NewsApi (NEWS_API_OPTIONS);
    const mainApi = new MainApi(MAIN_API_OPTIONS);
    const popup = new Popup(mainApi);
    const formValidator = new FormValidator();   
    const news = new News(mainApi);
    const newsList = new NewsList(newsPlace, news);   
    const displayControl = new DisplayControl(popup);    

    


    // открытие формы авторизации
    buttonAuth.addEventListener('click', () => {
        const userAuth = getUserAuth();  
        const errMessagesList = document.querySelectorAll('.form__err');        
        
        if (userAuth) {
            displayControl.logout();
        } else {
            popup.control(formAuth.closest('.popup'));
            popup.clearErrMessages(errMessagesList);
        }        
    });

    // переход между формами по ссылке
    openFormByLink.forEach((link) => {
        const errMessagesList = document.querySelectorAll('.form__err');
        link.addEventListener('click', () => {
            popup.control(formAuth.closest('.popup'));
            popup.control(formReg.closest('.popup'));
            popup.clearErrMessages(errMessagesList);
        });
    });   

    // закрытие формы
    buttonClose.forEach((button) => {
        button.addEventListener('click', (event) => {            
            popup.control(event.target.closest('.popup'));            
        });
    });
    
    // открытие формы входа из окна собщения о регистрации
    msgLink.addEventListener('click', () => {
        event.preventDefault();
        const errMessagesList = document.querySelectorAll('.form__err');

        popup.control(msgLink.closest('.popup'));
        popup.control(formAuth.closest('.popup'));
        popup.clearErrMessages(errMessagesList);
    });

    // загрузка новостей
    formSearch.addEventListener('submit', () => {
        event.preventDefault();
        const keyword = formSearch.elements.keyword;
        const preloader = document.querySelector('.preloader');
        const searchResult = document.querySelector('.search-result');
        const newsCards = document.querySelectorAll('.news__card');
        const searchErr = document.querySelector('.search__err');
        const pageName = document.querySelector('.page').getAttribute('name');

        if (formSearch.elements.keyword.value === '') {
            searchErr.textContent = 'Введите запрос';
            return;
        } else {
            searchErr.textContent = '';
        }

        searchResult.classList.remove('search-result_is-opened');
        preloader.classList.add('preloader_is-opened');

        newsApi.getNews(keyword.value)
            .then(news => {
                for (const newsCard of newsCards) {
                    newsPlace.removeChild(newsCard);
                }                
                newsList.renderNews(news.articles, pageName);
            })
            
            .then(() => {
                newsList.showMoreNews();               
                preloader.classList.remove('preloader_is-opened');
                searchResult.classList.add('search-result_is-opened');
            })
            .catch(err => {
                console.log(err)
            });
    })


    // показать больше новостей на странице
    searchResultButton.addEventListener('click', () => {
        newsList.showMoreNews();
    });


    // регистрация нового пользователя
    formReg.addEventListener('submit', () => {
        event.preventDefault();

        const userData = {
            email: formReg.elements.reg_email.value,
            password: formReg.elements.reg_pass.value,
            name: formReg.elements.reg_name.value
        };        

        mainApi.createUser(userData)
            .then((res) => {
                console.log(res)
            })
            .then(() => {
                displayControl.signup();
            })
            .catch(err => {
                console.log(err)
            });
    });

    // авторизация
    formAuth.addEventListener('submit', () => {
        event.preventDefault();       
        const userAuth = getUserAuth();
        const userData = {
            email: formAuth.elements.auth_email.value,
            password: formAuth.elements.auth_pass.value,            
        };

        mainApi.login(userData)
            .then((res) => {
                displayControl.login(res.user.name, userAuth);                
            })
            .catch(err => {
                console.log(err)
            });            
    });

    // управление мобильным меню
    
    buttonMobileMenu.addEventListener('click', () => {
        displayControl.mobileMenu(buttonMobileMenu);        
    });    

    // показ страницы для авториизованных пользователей при перезагрузке страницы
    if (localStorage.getItem('user')) {
        const userData = JSON.parse(localStorage.getItem('user'));        
        displayControl.login(userData.userName, userData.isAuth);
    };


    // добавление валидаторов на форму
    for (const form of forms) {
        formValidator.setEventListener(form);
    };    

})();
