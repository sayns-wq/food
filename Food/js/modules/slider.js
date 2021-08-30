function slider(){

    const slides = document.querySelectorAll('.offer__slide'),
          slider = document.querySelector('.offer__slider'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;

          function deleteNotDigits(str){
              return +str.replace(/\D/g, '');
          }
    let slideIndex = 1;
    let offset = 0;
     if(slides.length < 10){
            total.textContent = `0${slides.length}`;
            current.textContent = `0${slideIndex}`;
        } else {
            total.textContent = `${slides.length}`;
            current.textContent = `${slideIndex}`;
        }
    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = "relative";

    const dots = document.createElement('ol'),
          dotsContainer = [];
    dots.classList.add('carousel-indicators');
    slider.append(dots);

    for (let i = 0; i < slides.length; i++){
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i+1);
        dot.classList.add('dot');
        if (i==0){
            dot.style.opacity = 1;
        }
        dots.append(dot);
        dotsContainer.push(dot);
    }


    next.addEventListener('click' , () => {
            if(offset == deleteNotDigits(width) * (slides.length - 1)){
                offset = 0;
            } else {
                offset+= deleteNotDigits(width);
            }

            slidesField.style.transform = `translateX(-${offset}px)`;
            if (slideIndex == slides.length){
                slideIndex = 1;
            } else {
                slideIndex++;
            }
            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = `${slideIndex}`;
            }

            dotsContainer.forEach(dot => {
                dot.style.opacity = '.5';
            });
            dotsContainer[slideIndex-1].style.opacity = 1;
        });

        prev.addEventListener('click' , () => {
            if(offset == 0){
                offset = deleteNotDigits(width) * (slides.length - 1);
            } else {
                offset -= deleteNotDigits(width);
            }

            slidesField.style.transform = `translateX(-${offset}px)`

            if (slideIndex == 1){
                slideIndex = slides.length;
            } else {
                slideIndex--;
            }

            if (slides.length < 10) {
                current.textContent = `0${slideIndex}`;
            } else {
                current.textContent = `${slideIndex}`;
            }
            dotsContainer.forEach(dot => {
                dot.style.opacity = '.5';
            });
            dotsContainer[slideIndex-1].style.opacity = 1;
        });

        dotsContainer.forEach(dot => {
            dot.addEventListener('click', (e) => {
                const slideTo = e.target.getAttribute('data-slide-to');

                slideIndex = slideTo;
                offset = +width.replace(/\D/g, '') * (slideTo- 1);

                slidesField.style.transform = `translateX(-${offset}px)`;

                if (slides.length < 10) {
                    current.textContent = `0${slideIndex}`;
                } else {
                    current.textContent = `${slideIndex}`;
                }

                dotsContainer.forEach(dot => {
                    dot.style.opacity = '.5';
                });
                dotsContainer[slideIndex-1].style.opacity = 1;

               
            })
        })

    // showSlides(1);

    // if(slides.length < 10){
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = `${slides.length}`;
    // }
    // function showSlides(n) {
    //     if(n > slides.length){
    //         slideIndex = 1;
    //     }
    //     if(n < 1){
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';

    //     if(slides.length < 10){
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;
    //     }
    // }

    // function plusSlides(n){
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click' , () => {
    //     plusSlides(-1);
    // });
    // next.addEventListener('click' , () => {
    //     plusSlides(1);
    // });

}

export default  slider