'use strict';

// window.addEventListener('DOMContentLoaded', () => {

//     const tabs = document.querySelectorAll('.tabheader__item'),
//           tabsContent = document.querySelectorAll('.tabcontent'),
//           tabsParent = document.querySelector('.tabheader__items');

//     function hideTabContent() {
//         //Скрывает весь контент с кнопками
//         tabsContent.forEach(item => {
//             item.classList.add('hide');
//             item.classList.remove('show', 'fade');
//         });
//         //Убирает класс активности с элемента,
//         //тем самым скрывает выбраный элемент
//         tabs.forEach(item => {
//             item.classList.remove('tabheader__item_active');
//         });
//     }
//         //Добавляет класс активности, 
//         //тем самым показывает выбранный элемент
//     function showTabContent(i = 0) {
//         tabsContent[i].classList.add('show', 'fade');
//         tabsContent[i].classList.remove('hide');
//         tabs[i].classList.add('tabheader__item_active');
//     }

//     hideTabContent();
//     showTabContent(0);
//     //Функция делегирования
//     tabsParent.addEventListener('click', (event) => {
//         const target = event.target;
//         //Проверяем, туда ли был осуществлен клик
//         if (target && target.classList.contains('tabheader__item')) {
//             //Перебераем и проверяем, накакой именно элемент был блик
//             tabs.forEach((item, i) => {
//                 if (item == target) {
//                     hideTabContent();
//                     showTabContent(i);
//                 }
//             });
//         }
//     });




// });



document.addEventListener('DOMContentLoaded', () =>{
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
        
    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent(0);

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });



});