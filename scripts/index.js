// import '../pages/index.css';

import {Popup} from './popup.js';
import {FormValidator} from './form_validator.js';


console.log('dfdfd');


(function(){
    const page = document.querySelector('.page');

    const formAuth = document.forms.form_auth;
    const formReg = document.forms.form_reg;

    const popup = new Popup();
    const formValidator = new FormValidator();

    const buttonAuth = document.getElementById('button_auth');
    const buttonClose = document.querySelectorAll('.popup__close');    

    const openFormByLink = document.querySelectorAll('.form__link');

    const forms = document.querySelectorAll('.form')




    // открытие формы авторизации
    buttonAuth.addEventListener('click', () => {  
        const errMessagesList = document.querySelectorAll('.form__err');      
        popup.control(formAuth.closest('.popup'));
        popup.clearErrMessages(errMessagesList);
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

    



    // for (const form of forms) {
    //     formValidator.setEventListener(form);
    // };



    

}());
