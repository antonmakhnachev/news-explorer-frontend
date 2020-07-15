export class FormValidator {
    checkInputValidity (event) {
        const errMsg = document.getElementById(`${event.target.id}_err`)

        switch (true) {
            case event.target.validity.valueMissing:
                errMsg.textContent = 'Это обязательное поле';
                break;
            case event.target.validity.tooShort:
                errMsg.textContent='Должно не менее 2 символов';
                break;
            case event.target.validity.typeMismatch:
                errMsg.textContent='Здесь должна быть ссылка';
                break;
            default:
                errMsg.textContent = '';
        }
    };


    setEventListener(form) {
        form.addEventlistener('input', this.checkInputValidity);
    };

};