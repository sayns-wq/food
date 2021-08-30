function calc() {

    const result= document.querySelector('.calculating__result span');
 
    let sex = localStorage.getItem('sex')||'female',
     height, wheght,age, 
     ratio = localStorage.getItem('ratio') || 1.375;
        if(!localStorage.getItem('sex')){
            localStorage.setItem('sex', 'female')
        }
        if(!localStorage.getItem('ratio')){
            localStorage.setItem('ratio',1.375)
        }
        
     
        function initLocalSettings(selector, activClass){
            const elements = document.querySelectorAll(selector);
            
            elements.forEach(elem => {
                elem.classList.remove(activClass);
                if(elem.getAttribute('id') === localStorage.getItem('sex')){
                    elem.classList.add(activClass);
                    
                }

                if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                    elem.classList.add(activClass);
                }
            })
        }
        initLocalSettings('#gender div', 'calculating__choose-item_active');
        initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');
    function calcTotal() {
        if(!sex || !height || !wheght || !age || !ratio){
            result.textContent = '_____';
            return;
        }
        if(sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2*wheght) + (3.1*height) - (4.3 * age) * ratio));
        }else{
            result.textContent = Math.round((88.36 + (13.4*wheght) + (4.8*height) - (5.7 * age) * ratio));
        }
    }

    calcTotal();

    function getStaticInformation(selector, activClass) {
        const elements = document.querySelectorAll(`${selector}`);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) =>{
                if(e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio',+e.target.getAttribute('data-ratio'));
                }else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex',e.target.getAttribute('id'))
                }
    
               
    
                elements.forEach(elem => {
                    elem.classList.remove(activClass);
                })
    
                e.target.classList.add(activClass);
                calcTotal();
            });
        })
        
        
    }
    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    function getDynamicInformation(selector){
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if(input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            }else{
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    wheght = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break; 
            }
            calcTotal();
        })
    }
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');

}

export default calc