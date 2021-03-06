import './index.css';


import {Popup} from '../scripts/popup.js';
import {FormValidator} from '../scripts/formvalidator.js';
import {ApiGetNews} from '../scripts/apigetnews.js';
import {ApiMyServer} from '../scripts/apimyserver.js';
import {News} from '../scripts/news.js';
import {NewsList} from '../scripts/newslist.js';
import {DisplayControl} from '../scripts/displayControl.js'



console.log('dfdfd');


(function (){
    const page = document.querySelector('.page');
    const newsPlace = document.querySelector('.news');

    const formAuth = document.forms.form_auth;
    const formReg = document.forms.form_reg;
    const formSearch = document.forms.form_search;

    const msgLink = document.querySelector('.msg__link');

    

    const isDev = 'development';
    const serverNews = isDev === 'development' ? 'https://newsapi.org/v2/everything?' : 'https://praktikum.tk/news/v2/everything?';
    const server = isDev === 'development' ? 'http://localhost:3000' : 'https://api.newsexplorer.gq';
    const apiKey = '97fdf652ccdc4129b402ac0e0ac15072';
    

    const popup = new Popup();
    const formValidator = new FormValidator();   
    const apiGetNews = new ApiGetNews ({
        baseUrl: serverNews,
        apiKey: apiKey,
        from: new Date().getDate() - 7,
        to: new Date(),
        pageSize: 100
    });
    const apiMyServer = new ApiMyServer({
        baseUrl: server,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const news = new News(apiMyServer);
    const newsList = new NewsList(newsPlace, news, apiMyServer);   
    const displayControl = new DisplayControl(popup);
    

    const buttonAuth = document.getElementById('button_auth');
    const buttonClose = document.querySelectorAll('.popup__close');
    const buttonSearch = document.getElementById('button_search');
    const searchResultButton = document.querySelector('.search-result__button');
    const buttonMobileMenu = document.querySelector('.header__mobile-icon');

    const openFormByLink = document.querySelectorAll('.form__link');
    const savedNews = document.getElementById('savedNews');

    const forms = document.querySelectorAll('.form')




    // открытие формы авторизации
    buttonAuth.addEventListener('click', () => {
        const isAuth = localStorage.getItem('user');  
        const errMessagesList = document.querySelectorAll('.form__err');        
        
        if (isAuth) {
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
        })
    });   

    // закрытие формы
    buttonClose.forEach((button) => {
        button.addEventListener('click', (event) => {            
            popup.control(event.target.closest('.popup'));            
        });
    });
    
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

        apiGetNews.getNews(keyword.value)
            .then(news => {
                for (const newsCard of newsCards) {
                    newsPlace.removeChild(newsCard);
                }
                console.log(news.articles.length)
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

        apiMyServer.createUser(userData)
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

        const userData = {
            email: formAuth.elements.auth_email.value,
            password: formAuth.elements.auth_pass.value,            
        };

        apiMyServer.login(userData)
            .then((res) => {
                displayControl.login(res.user.name);
                console.log(res)                
                console.log(localStorage.getItem('user'));
            })
            .catch(err => {
                console.log(err)
            });            
    });

    // управление мобильным меню
    let isOpened = 0;
    buttonMobileMenu.addEventListener('click', () => {
        
        const mobileMenu = document.querySelector('.header__menu-mobile');
        const header = document.querySelector('.header');        

        mobileMenu.classList.toggle('menu-mobile_is-opened');
        header.classList.toggle('header_opened-menu');
        if (isOpened === 0) {
            buttonMobileMenu.src = '../images/close_mobile.png';
            isOpened = 1;
        } else {
            buttonMobileMenu.src = '../images/menu_mobile.png';
            isOpened = 0;
        }
        
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
