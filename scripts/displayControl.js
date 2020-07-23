export class DisplayControl {
    constructor(popup) {
        this.popup = popup;
    };

    signup(){
        const formReg = document.forms.form_reg;
        const msgLink = document.querySelector('.msg__link');

        this.popup.control(formReg.closest('.popup'));
        this.popup.control(msgLink.closest('.popup'));
    };

    login(userName, isAuth) {
        const logoutIcon = document.createElement('img');        
        const menuAuth = document.querySelector('.menu__text-auth');
        const formAuth = document.forms.form_auth;        
        const buttonAuth = document.getElementById('button_auth');

        logoutIcon.classList.add('header__logout-img');
        logoutIcon.src = '../images/logout_white.png'
        

        

        if (!isAuth) {
            this.popup.control(formAuth.closest('.popup'));
        };
        

        menuAuth.classList.add('is-auth');
        buttonAuth.textContent = userName;        
        buttonAuth.appendChild(logoutIcon);

        localStorage.setItem('user', JSON.stringify({
            isAuth: 1,
            userName: userName
        }));
    };

    logout() {
        const menuAuth = document.querySelector('.menu__text-auth');        
        const logoutIcon = document.querySelector('.header__logout-img')
        const buttonAuth = document.getElementById('button_auth');       

        menuAuth.classList.toggle('is-auth');
        buttonAuth.textContent = 'Авторизоваться';
        logoutIcon.remove();       

        localStorage.removeItem('user');
    };
};