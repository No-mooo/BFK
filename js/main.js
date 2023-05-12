
const swiper = new Swiper(".sliderWork-swiper", {
    slidesPerView: 'auto',
    centeredSlides: true,
    centerInsufficientSlides: true,
    centeredSlidesBounds: true,
    spaceBetween: 15,
    freeMode: true,
    grabCursor: true,

    navigation: {
        nextEl: ".sliderWork-next",
        prevEl: ".sliderWork-prev",
    },

    breakpoints: { 
        500: {
            spaceBetween: 20,
            centeredSlides: false,
            centerInsufficientSlides: false,
            centeredSlidesBounds: false,
        },

        731: {
            spaceBetween: 45,
        }
    },
});


let calcswiper = new Swiper(".calc-swiper", {
    slidesPerView: 3,
    spaceBetween: 5,
    centeredSlides: true,
    activeIndexChange: 3,
    initialSlide: 1,
    navigation: {
        nextEl: ".calc-nexSwiper",
        prevEl: ".calc-prevSwiper",
    },



    breakpoints: { 
        500: {

        },

        731: {
            
        }
    },
});



// Open modal windows
document.querySelectorAll('.benefits-card').forEach(item => {
    item.addEventListener('click', () => {
        let modalWindows = document.querySelector('.modalWindows');

        modalWindows.querySelector('.modalWindows-imgBg').querySelector('img').setAttribute('src', item.getAttribute('data-bgToModalWindows'));
        modalWindows.querySelector('.modalWindows-title').innerHTML = item.getAttribute('data-titleToModalWindows');
        modalWindows.querySelector('.modalWindows-text').innerHTML = item.getAttribute('data-textToModalWindows');

        document.querySelector('.modalWindows').style.display = 'flex';
    });
});


document.querySelector('.modalWindows').addEventListener('click', item => {
    if (!item.target.closest('.modalWindows-wrap') ||  item.target.closest('.radius-closeBtn')) {
        document.querySelector('.modalWindows').style.display = 'none';
    }
});
// /Open modal windows




// open/close menu header
[...document.querySelector('.header-nav-list').children].forEach(item => {


    item.addEventListener('mouseover', () => {
        if (window.innerWidth > 768) { // 768px start mobile
            item.querySelector('.listMenu-wrap').style.display = 'block';
        }
    });

    item.addEventListener('mouseout', () => {
        if (window.innerWidth > 768) {
            item.querySelector('.listMenu-wrap').style.display = 'none';
        }
    });


});
// / open/close menu header





// open/close menu header city
document.querySelector('.city-wrap').addEventListener('click', item => {

    document.querySelector('.mobileBg').style.display = 'flex';

});

document.querySelector('.bgItem').addEventListener('click', item => {
    item.stopPropagation();
    document.querySelector('.mobileBg').style.display = 'none';
});

document.querySelector('.city-wrap').querySelectorAll('.closeBtn').forEach(item => {
    item.addEventListener('click', item => {
        item.stopPropagation();
        document.querySelector('.mobileBg').style.display = 'none';
    });
})
// / open/close menu header city



// mobile burger
document.querySelector('.mobile-burger').addEventListener('click', () => {
    document.querySelector('.header-nav').style.display = 'flex';
});


document.querySelector('.header-nav').addEventListener('click', item => {
    if (window.innerWidth <= 768) {
        if (!item.target.closest('.header-nav-wrap') || item.target.closest('.radius-closeBtn')) {
            document.querySelector('.header-nav').style.display = 'none';
        }
    }
});

// / mobile burger


/* ----------------- Price list ------------------ */
window.onload = function(){

    // инициализируем слайдер
    function initPriceListSlider() {
        let priceListSlider = new Swiper(".main-price-list-slider", {
            slidesPerView: 4,
            initialSlide: 0,
            direction: 'vertical',
            navigation: {
                nextEl: ".main-price-list-slider-next",
                prevEl: ".main-price-list-slider-prev",
            },
            breakpoints: { 
                900: {
                    slidesPerView: 5,
                }
            },
        });
    }

    // вытаскиваем элементы для списка из атрибутов
    function getPriceList(tab) {
        let priceList = tab.getAttribute('data-priceList');
        priceList = JSON.parse(priceList);

        let priceListHtml = ``;

        priceList['items'].forEach( item => {
            priceListHtml += `<li  class="swiper-slide"><p class="main-price-list-name">${item['name']}</p><p class="main-price-list-price">${item['price']}</p></li>`;
        });

        document.querySelector('.main-price-list-slider-wrapper').innerHTML = priceListHtml;
        initPriceListSlider();
    }

    // меняем блок при ширине меньше 900px
    function checkPriceListBlock () {
        let list = document.querySelector('.main-price-list');

        if (window.innerWidth < 900) {
            document.querySelector('.main-price-tab-wrapper.active .main-price-tab').appendChild(list);
        }else{
            document.querySelector('.main-price-wrapper').appendChild(list);
        }
    }

    getPriceList(document.querySelector('.main-price-tab-wrapper'));
    checkPriceListBlock();
 
    // переключение табов
    document.querySelectorAll('.main-price-tab-wrapper').forEach( (tab, key) => {
        tab.addEventListener('click', () => {

            let classList = ['active', 'prevActive', 'nextActive', 'first-elem', 'last-elem'];

            classList.forEach( className => {
                if (document.querySelector(`.main-price-tab-wrapper.${className}`)) {
                    document.querySelector(`.main-price-tab-wrapper.${className}`).classList.remove(className);
                }else if (document.querySelector(`.main-price-list.${className}`)) {
                    document.querySelector(`.main-price-list.${className}`).classList.remove(className);
                }
            });

            tab.classList.add('active');

            if (key == 0) {
                document.querySelector('.main-price-list').classList.add('first-elem');
                tab.nextElementSibling.classList.add('nextActive');
            }else if (document.querySelectorAll('.main-price-tab-wrapper').length == key + 1) {
                document.querySelector('.main-price-list').classList.add('last-elem');
                tab.previousElementSibling.classList.add('prevActive');
            }else{
                tab.nextElementSibling.classList.add('nextActive');
                tab.previousElementSibling.classList.add('prevActive');
            }

            getPriceList(tab);
            checkPriceListBlock();
        });
    });

    window.addEventListener('resize', () => {
        checkPriceListBlock();
    });
};

/* ----------------- /Price list ------------------ */