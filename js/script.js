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
          modal = document.querySelector('.modal'),
          modalCloseBtn = document.querySelector('[data-close]');

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
    modalCloseBtn.addEventListener('click', closeModal);
        // modal.classList.toggle('show');
        
    

    // Закрываем модальное окно нажатием в любую область вокруг
    modal.addEventListener('click', (event) => {
        const target = event.target;

        if (target === modal) {
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
    const modalTimerId = setTimeout(openModal, 3000);
    
    // Открытие модального окна при достижении конца страницы
    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
       

});

