function modal() {
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
}

module.exports = modal;