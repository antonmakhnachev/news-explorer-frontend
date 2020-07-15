export class Popup {
    control(popupName) {
        popupName.classList.toggle('popup_is-opened');
    };

    clearErrMessages(errMessagesList) {
        errMessagesList.forEach(errMsg => {
            errMsg.textContent = '';
        });
        

    }


};