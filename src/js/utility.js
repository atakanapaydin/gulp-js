const headerNav = document.getElementsByClassName('navList');
const bannerList = document.getElementsByClassName('mySwiper');
const barList = document.getElementsByClassName('bar-container');
const productsList = document.getElementsByClassName('product-list');

const signUpBtn = document.getElementsByClassName('login');
const loadMoreBtn = document.getElementsByClassName('load-more');
const search = document.getElementsByClassName('search');
const body = document.getElementsByTagName('body');

let toggleMenu = document.querySelectorAll('.mobile-menu');
let menu = document.getElementsByClassName('nav-list');

let id = document.getElementById('#asd');
const header = document.getElementsByTagName('header');

toggleMenu[0].addEventListener('click', function() {
    console.log(toggleMenu);
    menu[0].classList.toggle('active');
    signUpBtn[0].classList.toggle('active');
    body[0].classList.toggle('active');
});

window.addEventListener('scroll', function() {
    header[0].classList.toggle('sticky', window.scrollY > 0);
});

const langBtns = document.querySelectorAll('.lang-btn');
let language = getCookie('language') || 'tr';

const navJson = '../src/JSON/menus.json';
const bannerJson = '../src/JSON/banner.json';
const barJson = '../src/JSON/bar.json';
const productsJson = '../src/JSON/products.json';
const othersJson = '../src/JSON/static.json';

langBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-lang') === language) {
        btn.classList.add('active');
    }
    btn.addEventListener('click', function(event) {
        event.preventDefault();
        const langCode = btn.getAttribute('data-lang');
        setLanguage(langCode);

        langBtns.forEach(btn => {
            btn.classList.remove('active');
        });
        btn.classList.add('active');
        updateNavContent(langCode);
        updateBannerContent(langCode);
        updateBarContent(langCode);
        updateProductsContent(langCode);
        updateOthers(langCode);
    });
});

function updateOthers(langCode) {
    fetch(othersJson)
        .then(response => response.json())
        .then(data => {
            const languageData = data.find(item => item.langCode === langCode);
            loadMoreBtn[0].innerHTML = '';
            signUpBtn[0].innerHTML = '';
            let link = `<a id="loadMore" href="javascript:;"><img src="src/img/frame-btn.svg" alt="">${languageData.getMore.title}</a>`;
            loadMoreBtn[0].innerHTML += link;
            let link2 = `
          <a href="#" class="btn btn-white btn-animate sign-up-btn">${languageData.signUp.title}</a>`;
            signUpBtn[0].innerHTML += link2;

            search[0].innerHTML = '';
            let link3 = `<input id="searchInput" type="text" placeholder="${languageData.productSearch.placeHolder}"><img src="src/img/search.svg" alt="">`;
            search[0].innerHTML += link3;
        })
        .catch(error => {
            console.error('Error', error);
        });
}

function setLanguage(langCode) {
    document.cookie = `language=${langCode}; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/`;
    const newURL = window.location.pathname + (langCode === 'en' ? '?lang=en' : '');
    window.history.pushState({
        lang: langCode
    }, '', newURL);
}

function getCookie(name) {
    const cookieValue = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
    return cookieValue ? cookieValue.pop() : '';
}

function updateNavContent(langCode) {
    fetch(navJson)
        .then(response => response.json())
        .then(data => {
            const languageData = data.find(item => item.langCode === langCode);
            const menus = languageData.menus;
            headerNav[0].innerHTML = '';
            menus.forEach(menu => {
                const textContent = menu.title;
                var link = `<li><a href="#" class="">${textContent}</a></li>`;
                headerNav[0].innerHTML += link;
            });
        })
        .catch(error => {
            console.error('Error', error);
        });
}

function updateBannerContent(langCode) {
    fetch(bannerJson)
        .then(response => response.json())
        .then(data => {
            const languageData = data.find(item => item.langCode === langCode);
            const banner = languageData.banner;
            bannerList[0].innerHTML = '';
            banner.forEach(banner => {
                const bannerTitle = banner.title;
                const parts = bannerTitle.split('[');
                const agencyPart = parts[1].split(']');
                const bannerDesc = banner.description;
                let words = agencyPart[1].split(' ');
                let lastWord = words[words.length - 1];
                words.pop();
                agencyPart[1] = words.join(' ');
                const bannerBtnText = banner.button.text;
                var bannerItem = `
                <swiper-slide>
                <div class="swiper-content">
                <div class="swiper-content-title">
                <span class="block-span">${parts[0]}<span class="agency-span"><span class="right-top-border"></span>${agencyPart[0]}</span>
                <span class="block-span">${agencyPart[1]}</span>
                ${lastWord}
                <span class="design-square">
                  <span class="first"></span>
                  <span class="second"></span>
                  <span class="third"></span>
                  <span class="fourth"></span>
                </span>
              </div>
                  <div class="swiper-content-desc">
                    ${bannerDesc}
                  </div>
                  <div class="swiper-content-link">
                    <a href="#" class="btn btn-white btn-animate ">${bannerBtnText}</a>
                  </div>
                </div>
                <div class="swiper-image">
                  <div class="swiper-image-frame">
                    <img src="src/img/banner-img.png" alt="banner-img">
                    <div class="swiper-image-frame-button">
                      <img src="src/img/frame-btn.svg" alt="banner-btn">
                    </div>
                  </div>
                  <div class="swiper-image-back-bg">
                    <img src="src/img/banner-bg-img.png" alt="banner-bg">
                  </div>
                </div>
              </swiper-slide>
        `;
                bannerList[0].innerHTML += bannerItem;
            });
        })
        .catch(error => {
            console.error('Error', error);
        });
}

function updateBarContent(langCode) {
    fetch(barJson)
        .then(response => response.json())
        .then(data => {
            const languageData = data.find(item => item.langCode === langCode);
            const barNumber = languageData.number;
            const barTitle = languageData.title;
            const barDesc = languageData.description;
            const barBtnText = languageData.link.text;
            barList[0].innerHTML = '';
            let link = `
        <div class="bar-title">
        <h1>
          ${barNumber}
        </h1>
        <p>${barTitle}</p>
      </div>
      <div class="bar-img">
        <img src="src/img/bar-img.png" alt="">
      </div>
      <div class="bar-desc">
        <p>${barDesc}</p>
        <a href="#">${barBtnText}</a>
      </div>
        `;
            barList[0].innerHTML += link;
        })
        .catch(error => {
            console.error('Error', error);
        });
}

function updateProductsContent(langCode) {
    fetch(productsJson)
        .then(response => response.json())
        .then(data => {
            const languageData = data.find(item => item.langCode === langCode);
            const products = languageData.products;
            let visibleProducts = 6;
            const productsPerPage = 6;
            const loadMoreBtn = document.getElementsByClassName('load-more');
            const mobileSearchBtn = document.getElementsByClassName('mobile-search');

            showProducts(products, visibleProducts);

            function showProducts(products, visibleProducts) {
                productsList[0].innerHTML = '';
                const productVisible = products.slice(0, visibleProducts);
                productVisible.forEach(product => {
                    const productSort = product.sort;
                    const productTitle = product.title;
                    var productItem = `
                        <div class="product-list-item" data-sort="${productSort}">
                        <div class="product-list-item-img">
                          <img src="src/img/banner-img.png" alt="">
                        </div>
                        <div class="product-list-item-desc">
                          <h2>${productTitle}</h2>
                        </div>
                    </div>
                        `;
                    productsList[0].innerHTML += productItem;
                });
                if (visibleProducts >= products.length) {
                    loadMoreBtn[0].style.display = 'none';
                } else {
                    loadMoreBtn[0].style.display = 'block';
                }
            }

            function filterProducts(searchTerm) {
                const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm.toLowerCase()));
                showProducts(filteredProducts);
            }

            searchInput.addEventListener('keydown', function(event) {
                if (event.key === 'Enter') {
                    const searchTerm = searchInput.value.trim();
                    filterProducts(searchTerm);
                }
            });

            loadMoreBtn[0].addEventListener('click', function() {
                visibleProducts += productsPerPage;
                showProducts(products, visibleProducts);
            });

            mobileSearchBtn[0].addEventListener('click', function() {
                // search[0].classList.toggle('active');
            });
        })
        .catch(error => {
            console.error('Error', error);
        });
}

window.onload = function() {
    const initialLang = getCookie('language') || 'tr';
    updateOthers(initialLang);
    updateNavContent(initialLang);
    updateBannerContent(initialLang);
    updateBarContent(initialLang);
    updateProductsContent(initialLang);
};