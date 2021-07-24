function openModal(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    modal.classList.remove('hide');
    // modal.classList.toggle('show');
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);
    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
    
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function modal(triggerSelector, modalSelector, modalTimerId) {
    //---------------Modal--------------------

    const modalTrigger = document.querySelectorAll(triggerSelector),
          modal = document.querySelector(modalSelector);

    // Показываем содержимое при нажатии на триггер
    modalTrigger.forEach (btn => {
        btn.addEventListener('click', () => openModal(modalSelector, modalTimerId));
    });



    // Скрываем содержимое при нажатии на триггер
    
        // modal.classList.toggle('show');
        
    

    // Закрываем модальное окно нажатием в любую область вокруг
    modal.addEventListener('click', (event) => {
        const target = event.target;

        if (target === modal || target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    // Закрываем модальное окно по нажатию на Esc (проверка, что мод.окно открыто)
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });
    
    // Открытие модального окна при достижении конца страницы
    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);
}

export default modal;
export {closeModal};
export {openModal}; 

