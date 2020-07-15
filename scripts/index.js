// import '../pages/index.css';
// 97fdf652ccdc4129b402ac0e0ac15072

import {Popup} from './popup.js';
import {FormValidator} from './form_validator.js';
import {ApiGetNews} from './api_get_news.js';


console.log('dfdfd');


(function(){
    
    const page = document.querySelector('.page');

    const formAuth = document.forms.form_auth;
    const formReg = document.forms.form_reg;
    const formSearch = document.forms.form_search;

    const isDev = 'development';
    const serverNews = isDev === 'development' ? 'https://newsapi.org/v2/everything?' : 'https://praktikum.tk/news/v2/everything?';
    const apiKey = '97fdf652ccdc4129b402ac0e0ac15072';
    

    const popup = new Popup();
    const formValidator = new FormValidator();
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


    formSearch.addEventListener('submit', () => {
        event.preventDefault();
        const keyword = formSearch.elements.keyword;

        apiGetNews.getNews(keyword.value)
            .then(news => {
                console.log(news)
            })
            .catch(err => {
                console.log(err)
            })
    })
    

    



    for (const form of forms) {
        formValidator.setEventListener(form);
    };



    

}());
