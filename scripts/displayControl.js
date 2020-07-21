export class DisplayControl {
    constructor(popup) {
        this.popup = popup;
    }

    signup(){
        const formReg = document.forms.form_reg;
        const msgLink = document.querySelector('.msg__link');

        this.popup.control(formReg.closest('.popup'));
        this.popup.control(msgLink.closest('.popup'));
    }

    login(userName, isAuth) {
        const menuAuth = document.querySelector('.menu__text-auth');
        const formAuth = document.forms.form_auth;
        // const logoutIcon = document.getElementById('logoutImg');
        const buttonAuth = document.getElementById('button_auth');

        

        if (!isAuth) {
            this.popup.control(formAuth.closest('.popup'));
        }
        

        menuAuth.classList.add('is-auth');
        buttonAuth.textContent = userName;
        //logoutIcon.classList.add('header__logout-img_is-opened');
        // logoutIcon.style.display = 'block';
        // buttonAuth.appendChild(logoutIcon);

        localStorage.setItem('user', JSON.stringify({
            isAuth: 1,
            userName: userName
        }));
    }

    logout() {
        const menuAuth = document.querySelector('.menu__text-auth');
        const formAuth = document.forms.form_auth;
        // const logoutIcon = document.getElementById('logoutImg');
        const buttonAuth = document.getElementById('button_auth');

        

        menuAuth.classList.toggle('is-auth');
        buttonAuth.textContent = 'Авторизоваться';
        //logoutIcon.classList.toggle('header__logout-img_is-opened');
        // logoutIcon.style.display = 'none';

        
        

        localStorage.removeItem('user');

    }
}