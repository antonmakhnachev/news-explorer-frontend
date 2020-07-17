export class Popup {
    
    control(popupName) {
        this.clearInput(popupName);
        this.resetButtonState(popupName);
        popupName.classList.toggle('popup_is-opened');
        
        
    };

    clearErrMessages(errMessagesList) {
        errMessagesList.forEach(errMsg => {
            errMsg.textContent = '';
        });
    }

    clearInput(popupName) {
        const inputList = popupName.getElementsByTagName('input');

        for (const input of inputList) {
            input.value = '';
        };
    }

    resetButtonState(popupName) {
        const forms = popupName.getElementsByTagName('form');
        
        for (const form of forms) {
            const button = form.elements.button_submit;
            button.disabled = true;
            button.classList.remove('form__button_is-active');
        }
    }




};