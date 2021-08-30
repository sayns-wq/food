   import tabs from './modules/tabs';
   import modal from './modules/modal';
   import timer from './modules/timer';
   import slider from './modules/slider';
   import forms from './modules/forms';
   import cards from './modules/cards';
   import calc from './modules/calc';
   import {openModal} from './modules/modal'

window.addEventListener('DOMContentLoaded', function() {

    const modalTimerId = setTimeout(() =>openModal('.modal',modalTimerId ), 300000);

    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimerId);
    timer('2022-11-21', '.timer');
    slider();
    forms('form', modalTimerId);
    cards();
    calc();
})

    
