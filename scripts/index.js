//import '../pages/index.css';
// 97fdf652ccdc4129b402ac0e0ac15072

import {Popup} from './popup.js';
import {FormValidator} from './formvalidator.js';
import {ApiGetNews} from './apigetnews.js';
import {News} from './news.js';
import {NewsList} from './newslist.js';


console.log('dfdfd');


(function(){
    
    const page = document.querySelector('.page');
    const newsPlace = document.querySelector('.news');

    const formAuth = document.forms.form_auth;
    const formReg = document.forms.form_reg;
    const formSearch = document.forms.form_search;

    const searchResultButton = document.querySelector('.search-result__button');

    const isDev = 'development';
    const serverNews = isDev === 'development' ? 'https://newsapi.org/v2/everything?' : 'https://praktikum.tk/news/v2/everything?';
    const apiKey = '97fdf652ccdc4129b402ac0e0ac15072';
    

    const popup = new Popup();
    const formValidator = new FormValidator();
    const news = new News();
    const newsList = new NewsList(newsPlace, news);
    const apiGetNews = new ApiGetNews ({
        baseUrl: serverNews,
        apiKey: apiKey,
        from: new Date().getDate() - 7,
        to: new Date(),
        pageSize: 100
    })

    const buttonAuth = document.getElementById('button_auth');
    const buttonClose = document.querySelectorAll('.popup__close');
    const buttonSearch =document.getElementById('button_search');

    const openFormByLink = document.querySelectorAll('.form__link');

    const forms = document.querySelectorAll('.form')




    // открытие формы авторизации
    buttonAuth.addEventListener('click', () => {  
        const errMessagesList = document.querySelectorAll('.form__err');      
        popup.control(formAuth.closest('.popup'));
        popup.clearErrMessages(errMessagesList);
        // formAuth.reset();
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

    // загрузка новостей
    formSearch.addEventListener('submit', () => {
        event.preventDefault();
        const keyword = formSearch.elements.keyword;
        const preloader = document.querySelector('.preloader');
        const searchResult = document.querySelector('.search-result');
        const newsCards = document.querySelectorAll('.news__card');
        const searchErr = document.querySelector('.search__err');

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
                newsList.renderNews(news.articles);
            })
            
            .then(() => {
                newsList.showMoreNews();               
                preloader.classList.remove('preloader_is-opened');
                searchResult.classList.add('search-result_is-opened');
            })
            .catch(err => {
                console.log(err)
            })
    })



    searchResultButton.addEventListener('click', () => {
        newsList.showMoreNews();
    })
    

    



    for (const form of forms) {
        formValidator.setEventListener(form);
    };



    

}());
