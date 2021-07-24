function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
        const tabs = document.querySelectorAll(tabsSelector),
              tabsContent = document.querySelectorAll(tabsContentSelector),
              tabsParent = document.querySelector(tabsParentSelector);

        function hideTabContent() {
        //Скрывает весь контент с кнопками
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        //Убирает класс активности с элемента,
        //тем самым скрывает выбраный элемент
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
        }
        //Добавляет класс активности, 
        //тем самым показывает выбранный элемент
        function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
        }

        hideTabContent();
        showTabContent(0);
        //Функция делегирования
        tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        //Проверяем, туда ли был осуществлен клик
        if (target && target.classList.contains(tabsSelector.slice(1))) {
            //Перебераем и проверяем, накакой именно элемент был блик
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

export default tabs;