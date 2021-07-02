'use strict';

window.addEventListener('DOMContentLoaded', () => {

//------------ Tabs -------------------------

    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        //Скрывает весь контент с кнопками
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        //Убирает класс активности с элемента,
        //тем самым скрывает выбраный элемент
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
        //Добавляет класс активности, 
        //тем самым показывает выбранный элемент
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(0);
    //Функция делегирования
    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        //Проверяем, туда ли был осуществлен клик
        if (target && target.classList.contains('tabheader__item')) {
            //Перебераем и проверяем, накакой именно элемент был блик
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

//---------------- Timer -------------------------

    const deadLine = '2021-06-17';

    function getTimeRemaining(endtime) {
        //получаем количество времени, до которого нам нужно досчитать
        const t = Date.parse(endtime) - Date.parse(new Date()),
              days = Math.floor((t / (1000 * 60 * 60 * 24))),
              hours = Math.floor((t / (1000 * 60 * 60) % 24)),
              minutes = Math.floor((t / 1000 / 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds,
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }

        }

    }

    setClock('.timer', deadLine);

//---------------Modal--------------------

    const modalTrigger = document.querySelectorAll('[data-modal]'),
          modal = document.querySelector('.modal');

    // Показываем содержимое при нажатии на триггер
    modalTrigger.forEach (btn => {
        btn.addEventListener('click', openModal);
    });

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }
    
    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    // Скрываем содержимое при нажатии на триггер
    
        // modal.classList.toggle('show');
        
    

    // Закрываем модальное окно нажатием в любую область вокруг
    modal.addEventListener('click', (event) => {
        const target = event.target;

        if (target === modal || target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    // Закрываем модальное окно по нажатию на Esc (проверка, что мод.окно открыто)
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Автоматическое открытие модального окна через заданное время
     const modalTimerId = setTimeout(openModal, 50000);
    
    // Открытие модального окна при достижении конца страницы
    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
    
//-------------Class--------------

   const cards = document.querySelector('.menu__item');

   class MenuCard {
       constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.transfer = 27;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.changeToUAH();
       }

       changeToUAH() {
           this.price = this.price * this.transfer;
       }

       render() {
           const element = document.createElement('div');

           if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
           } else {
                this.classes.forEach(className => {
                element.classList.add(className);
            });
           }

            

           element.innerHTML = `
           
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            
           `;

           this.parent.append(element);
        }
    }

    new MenuCard(
        'img/tabs/vegy.jpg',
        'vegy',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        9,
        '.menu .container',
        
    ).render();

    //----------------- Forms --------------

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/forms/spinner.svg',
        success: 'Спасибо! Мы с Вами свяжемся',
        failure: 'Что-то пошло не так...',
    };

    forms.forEach (item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMessage);

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            // request.setRequestHeader('Content-type', 'application/json; charset=utf-8'); // Если в формате FormData, то заголовок не нужен.
            const formData = new FormData(form);
            //Если нужно в формате json
            const object = {};

            formData.forEach(function (value, key) {
                object[key] = value;
            }); 

            const json = JSON.stringify(object);

            request.send(json);
            // request.send(formData);

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            });
        });
    }
     
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide'); // Скрываем предыдущий контент
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() =>{
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);

    }
  
});

