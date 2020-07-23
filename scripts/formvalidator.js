export class FormValidator {
    checkInputValidity (event) {
        const errMsg = document.getElementById(`${event.target.id}_err`);
        

        switch (true) {
            case event.target.validity.valueMissing:
                errMsg.textContent = 'Это обязательное поле';
                break;
            case event.target.validity.tooShort:
                errMsg.textContent=`Должно не менее ${event.target.getAttribute('minlength')} символов`;
                break;
            case event.target.validity.typeMismatch:
                errMsg.textContent='Некорректный email';
                break;
            default:
                errMsg.textContent = '';
        }

        
    }


    setEventListener (form) {        
        form.addEventListener('input', this.checkInputValidity);
        form.addEventListener('input', this.setSubmitButtonState);
    }

    setSubmitButtonState (event) {
        const form = event.currentTarget;
        const button = form.elements.button_submit;

        if (form.checkValidity()) {
            button.disabled = false;
            button.classList.add('form__button_is-active');
        } else {
            button.disabled = true;
            button.classList.remove('form__button_is-active');
        }

        
    }

};