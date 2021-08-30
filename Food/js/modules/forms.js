import {closeModal, openModal} from './modal'
import {postData} from '../services/servises'

function forms(formSelector, modalTimerId){
    
    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading; 
            statusMessage.style.cssText = `
            display:block;
            margin:0 auto;
            `
            form.appendChild(statusMessage);
        
          
           
            const formData = new FormData(form);

           
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            

            postData('http://localhost:3000/requests',json)
            .then(data => {
                console.log(data);
                showThanksModal( message.success);          
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(()=>{
                form.reset();
            })

    //         request.addEventListener('load', () => {
    //             if (request.status === 200) {
    //                 console.log(request.response);
    //                 showThanksModal( message.success);
                    
    //                 form.reset();
    //                 statusMessage.remove();
              
    //             } else {
    //                 showThanksModal(message.failure);
    //             }
    //         });
        });
     }
    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thamksModal = document.createElement('div');
        thamksModal.classList.add('.modal__dialog');
        thamksModal.innerHTML = `
        <div class="modal__content">
        <div class="modal__close" data-close>>&times;</div>
        <div class="modal__title">${message}</div>
        </div>
        `;
        document.querySelector('.modal').append(thamksModal);

        setTimeout(()=> {
            thamksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000)
    }
    fetch('http://localhost:3000/menu')
    .then(data => data.json())
    .then(res => console.log(res))
}

export default  forms;