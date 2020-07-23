
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

    mobileMenu(buttonMobileMenu) {
        const mobileMenu = document.querySelector('.header__menu-mobile');
        const header = document.querySelector('.header');
        const menuIsOpened = mobileMenu.classList.contains('.menu-mobile_is-opened');         

        mobileMenu.classList.toggle('menu-mobile_is-opened');
        header.classList.toggle('header_opened-menu');
        if (menuIsOpened) {
            buttonMobileMenu.src = '../images/close_mobile.png';            
        } else {
            buttonMobileMenu.src = '../images/menu_mobile.png';            
        };
    };

    mobileMenuArticles(buttonMobileMenu) {
        const mobileMenu = document.querySelector('.header__menu-mobile');
        const header = document.querySelector('.header');
        const siteName = document.querySelector('.header__site-name');
        const menuText = document.querySelectorAll('.menu__text');
        const menuIsOpened = mobileMenu.classList.contains('.menu-mobile_is-opened');
        const buttonAuth = document.querySelector('.header__button');

        mobileMenu.classList.toggle('menu-mobile_is-opened');
        header.classList.toggle('header_opened-menu');
        siteName.classList.toggle('menu_is-opened');
        buttonAuth.classList.toggle('menu_is-opened');
        for (const text of menuText) {
            text.classList.toggle('menu_is-opened');
        };        

        if (menuIsOpened) {
            buttonMobileMenu.src = '../images/close_mobile.png';            
        } else {
            buttonMobileMenu.src = '../images/menu_open_white_theme.png';            
        };        

    };

    updateArticlesPage(newsData, uniqueKeywords, userAuth) {
        const pageName = document.querySelector('.page').getAttribute('name');
        const info = document.querySelector('.info');
        const infoKeywords = document.createElement('p')
        //const uniqueWords = uniqueKeywords(newsData.data);
        const logoutIcon = document.createElement('img');
        const buttonAuth = document.getElementById('button_auth');
        const userName = userAuth.userName;
        const infoTitle = document.querySelector('.info__title');
        const savedNews = document.querySelector('.saved-news');              
        
        logoutIcon.classList.add('header__logout-img');
        logoutIcon.src = '../images/logout.png'

        buttonAuth.textContent = userName;        
        buttonAuth.appendChild(logoutIcon);
        if (uniqueKeywords.length === 0) {
            infoTitle.textContent = `${userName}, у вас нет сохранённых статей`
            savedNews.classList.remove('saved-news_is-opened');
        } else {
            if (uniqueKeywords.length <= 3) {
                infoKeywords.innerHTML = `<p class="info__keyword">По ключевым словам: <span class="info__keyword-text">${uniqueKeywords}</span></p>`
                info.appendChild(infoKeywords);                   
            } else {
                const uniqueKeywordsPart = uniqueKeywords.slice(0, 2)
                infoKeywords.innerHTML = `<p class="info__keyword">По ключевым словам: <span class="info__keyword-text">${uniqueKeywordsPart}</span> и <span class="info__keyword-text">${uniqueKeywords.length - uniqueKeywordsPart.length} другим</span></p>`
                info.appendChild(infoKeywords);                    
            }

            infoTitle.textContent = `${userName}, у вас ${newsData.length} сохранённых статей`
            savedNews.classList.add('saved-news_is-opened');
        }
    }
};