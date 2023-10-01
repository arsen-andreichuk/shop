const apiUrl = 'https://651458ac8e505cebc2eb2863.mockapi.io/';
const apiCatalog = apiUrl + 'catalog';
const apiHotOffer = apiCatalog + '/?hotoffer=yes';
const apiCatalogCat = apiCatalog + '/?catid=';
const apiSearch = apiCatalog + '/?search=';
const apiCategory = apiUrl + 'category';
const imgFolder = 'img/catalog/';



// Витягуємо різні елементи, щоб з ними працювати
const boxCatalog = document.querySelector('#catalog-products');
const boxCategory = document.querySelector('#category-list');
const boxCountProducts = document.querySelector('#view-count-products');
const boxHotOfferProducts = document.querySelector('#hot-offer-products');
const boxHotOfferBlock = document.querySelector('.hot-offers');
const boxSearchBtn = document.querySelector('#btn-search');
const boxSearchInput = document.querySelector('#input-search');
const boxCartProducts = document.querySelector('#js-cart-added-list');
const boxOrderForm = document.querySelector('#order-form');



// Функції для витягування данних з api
function getProducts() {
  return fetch(apiCatalog).then(response => response.json());
}

function getCategory() {
  return fetch(apiCategory).then(response => response.json());
}

function getHotOfferProducts() {
  return fetch(apiHotOffer).then(response => response.json());
}

function getProductsByCat(cat) {
  return fetch(apiCatalogCat+cat).then(response => response.json());
}

function getSearch(val) {
  return fetch(apiSearch+val).then(response => response.json());
}



// Функції помічтиник
function viewPrice(number) {
   return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

function setSavedProducts() {

   const cart = localStorage.getItem('cart');

   if (cart) {
      return JSON.parse(cart);
   } else {
      return [];
   }
}



// Основний масив корзини
const cart = setSavedProducts();

// Ховаємо і показуємо корзину
document.querySelector('#js-cart-added-btn').onclick = () => document.querySelector('#js-cart-added-list').classList.toggle('show');



// Виводимо товари в html
function viewProducts(dataList) {
   
   // Приймаємо проміс і працюємо з ним далі
   dataList.then(products => {
      
      // Якщо існує елемент на сторінці
      if (boxCountProducts) {
         
         // Виводимо циферку кільичності товарів
         boxCountProducts.innerHTML = products.length;

         // Перебираємо товари
         if (products.length === 0) {

            // Виводимо текст, якщо результат пустий 
            boxCatalog.innerHTML = `<div class="card-product">Немає товарів</div>`;

         } else {

            // Наповнюємо змінну масивом в вигляді html
            const productsHtml = products.map(product => {
               return `<div class="card-product">
                           <div class="card-product__img-hold">
                              <img src="${imgFolder + product.img}" alt="${product.title}" class="card-product__img js-card-add" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-img="${product.img}" data-count="1">
                           </div>
                           <div class="card-product__text-hold">
                              <a href="#" class="card-product__title-link js-card-add" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-img="${product.img}" data-count="1">${product.title}</a>
                              <span class="card-product__price">${viewPrice(product.price)} грн <small>${viewPrice(product.oldprice)} грн</small></span>
                              <a href="#" class="card-product__btn-add js-card-add" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-img="${product.img}" data-count="1"><svg class='icon icon-cart'><use xlink:href='#icon-cart-add'></use></svg></a>
                           </div>
                        </div>`;
            });

            // Виводимо одним махом
            boxCatalog.innerHTML = productsHtml.join('');
         }
         
      }
   });
   
}


// Витягуємо дані з api
const catalog = getProducts();

// При завантаженні сторінки виводимо товари
viewProducts(catalog);



// Виводимо категорії до списку
function viewCategories() {

   // Якщо існує елемент
   if (boxCategory) {
      
      // Витягуємо дані з api
      const categories = getCategory();

      // Приймаємо проміс і працюємо з ним далі
      categories.then(catList => {

         // Перебираємо категорії
         const categoriesHtml = catList.map(category => {
            return `<a href="${category.id}" class="dropdown-item js-cat" data-catid="${category.id}">${category.title}</a>`;
         });
      
         // Виводимо всі категорії за один раз
         boxCategory.innerHTML = `<a href="reset" data-catid="0" class="dropdown-item js-cat">Скинути вибір</a>` + categoriesHtml.join('');
      });

   }
}

// Виводимо категорії до html списку
viewCategories();




// Виводимо товари в html
function viewGotOfferProducts() {
   
   // Якщо існує елемент на сторінці
   if (boxHotOfferBlock) {

      // Витягуємо дані з api
      const dataList = getHotOfferProducts();

      // Приймаємо проміс і працюємо з ним далі
      dataList.then(products => {
            
         // Перебираємо товари
         if (products.length === 0) {

            // Ховаємо блок гарячих пропозицій
            boxHotOfferBlock.classList.add('hidden');

         } else {

            // Показуємо блок гарячих пропозицій
            boxHotOfferBlock.classList.remove('hidden');

            // Наповнюємо змінну масивом в вигляді html
            const productsHtml = products.map(product => {
               return `<div class="card-product">
                        <div class="card-product__img-hold">
                           <img src="${imgFolder + product.img}" alt="${product.title}" class="card-product__img js-card-add" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-img="${product.img}" data-count="1">
                        </div>
                        <div class="card-product__text-hold">
                           <a href="#" class="card-product__title-link js-card-add" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-img="${product.img}" data-count="1">${product.title}</a>
                           <span class="card-product__price">${viewPrice(product.price)} грн <small>${viewPrice(product.oldprice)} грн</small></span>
                           <a href="#" class="card-product__btn-add js-card-add" data-id="${product.id}" data-title="${product.title}" data-price="${product.price}" data-img="${product.img}" data-count="1"><svg class='icon icon-cart'><use xlink:href='#icon-cart-add'></use></svg></a>
                        </div>
                     </div>`;
            });

            // Виводимо одним махом
            boxHotOfferProducts.innerHTML = productsHtml.join('');
         }
      });
      
   }
}

// Виводимо гарячі пропозиції
viewGotOfferProducts();



// Працюємо з формою пошуку
if (boxSearchBtn) {
   boxSearchBtn.onclick = () => {
   
      // Відбираємо поле пошуку
      const val = boxSearchInput.value;

      // Змінна для виводу товарів
      let catalog;

      // Якщо немає пошукової фраза виводимо загальні товари
      if (val.length == 0) {
         
         // Витягуємо дані з api
         catalog = getProducts();

      } else {
         
         // Витягуємо дані з api
         catalog = getSearch(val);
      }

      // Виводимо товари
      viewProducts(catalog);
   }
}




// Слідкуємо за категоріями
if (boxCategory) {
   boxCategory.onclick = (e) => {

      // Забороняємо стандартний функціонал html
      e.preventDefault();

      // Витягуємо елемент по якому був клік
      const el = e.target;

      // Відбираємо дата атрибути цього елементу
      const elData = el.dataset;

      // Відираємо css клас, щоб по ньому відбирати потрібний нам елемент
      const elClass = el.classList;

      // Якщо це елемент категорії починаємо робити наш функціонал
      if (elClass.contains('js-cat')) {
         
         // Формуємо id категорії
         const catid = elData.catid;

         // Змінна для товарів
         let catalog;

         // Дивимося чи потрібно очищувати і просто виводити товари
         if (catid == 0 || catid == undefined) {
            
            // Витягуємо дані з api
            catalog = getProducts();

         } else {

            // Виводимо товари відносно категорії
            catalog = getProductsByCat(catid);
         }

         // Виводимо товари
         viewProducts(catalog);
      }
   }
}


// Підрахунок добавлених товарів
function setCartCountAdded() {

   // Витягуємо всі елементи в які треба виводити кількість
   const countElList = document.querySelectorAll('.js-cart-added-summ');

   // Перебираємо елементи, де потрібно відображати кількість
   countElList.forEach((countEl) => {
      
      // Якщо корзина пуста, тоді ховаємо циферку
      if (cart.length == 0) {
         countEl.classList.add('hide-num');
      } else {
         countEl.classList.remove('hide-num');
      }

      // Виводимо кількість в елемент
      countEl.innerHTML = cart.length;
  });
}



// Вивід товарів в корзину
function viewCartProducts() {

   // Виводимо кількість відразу в будь-якому випадку
   setCartCountAdded();

   // Перевірка на пустоту
   if (cart.length == 0) {
      
      // Виводимо пустий результат
      boxCartProducts.innerHTML = '<span class="no-result">Корзина пуста</span>';

   } else {

      // Наповнюємо змінну масивом в вигляді html
      const productsHtml = cart.map((product, key) => {
         return `<div class="cart-added-list__item">
                  <button class="cart-added-list__item-btn-delete btn-light js-card-remove" data-key="${key}"><svg class='icon icon-close'><use xlink:href='#icon-close'></use></svg></button>
                  <img src="img/catalog/${product.img}" alt="" class="cart-added-list__item-img">
                  <p class="cart-added-list__item-text-hold">
                     <a href="#" class="cart-added-list__item-title-link">${product.title}</a>
                     <span class="cart-added-list__item-meta-list">
                        <span class="cart-added-list__item-meta">Ціна: ${viewPrice(product.price)} грн</span>
                     </span>
                  </p>
                  <input type="text" class="cart-added-list__item-count" readonly placeholder="0" value="${product.count}" id="cart-count-${product.id}">
                  <button class="cart-added-list__item-btn-plus btn-light js-card-count" data-type="plus" data-key="${key}" data-for-input="#cart-count-${product.id}"></button>
                  <button class="cart-added-list__item-btn-minus btn-light js-card-count" data-type="minus" data-key="${key}" data-for-input="#cart-count-${product.id}"></button>
               </div>`;
      });

      // Виводимо одним махом
      boxCartProducts.innerHTML = productsHtml.join('');
   }
   
   // Зберігаємо дані в localstorage
   localStorage.setItem('cart', JSON.stringify(cart));
}

// Відразу виводимо товари в корзину, якщо вони є
viewCartProducts();


// Добавлення в корзину потрібно в декількох місцях
function setCartProduct(e) {
   
   // Витягуємо елемент по якому був клік
   let el = e.target;
   
   // Якщо це елемент іконки тоді відбираємо його батьківський елемент
   if (el.classList.contains('icon')) {
      el = el.parentNode;
   }
   
   // Проблема з svg іконкою, а саме тегом use
   if (el.nodeName == 'use') {
      el = el.parentNode.parentNode;
   }
   
   // Відбираємо дата атрибути цього елементу
   const elData = el.dataset;

   // Відираємо css клас, щоб по ньому відбирати потрібний нам елемент
   const elClass = el.classList;

   // Якщо це елемент категорії починаємо робити наш функціонал
   if (elClass.contains('js-card-add')) {

      // Мітка для перевірки дубліката
      let productExist = false;

      // Перевіряємо чи товар вже існує в масиві
      cart.forEach((el) => {

         // Звіряємо додані товари
         if (elData.id == el.id) {
            productExist = true;
         }

      })

      // Якщо товару немає тоді добавляємо
      if(productExist == false) {

         // Добавляємо товар в корзину
         cart.push(elData);
   
         // Після добавлення виводимо товари
         viewCartProducts();
      }
   } 
}


// Добавлення товару в корзину
if (boxCatalog) {
   boxCatalog.onclick = (e) => {

         // Забороняємо стандартний функціонал html
         e.preventDefault();
  
         // Добавляємо товар в корзину
         setCartProduct(e);
   }  
}

// Добавлення товару в корзину
if (boxHotOfferProducts) {
   boxHotOfferProducts.onclick = (e) => {

         // Забороняємо стандартний функціонал html
         e.preventDefault();
  
         // Добавляємо товар в корзину
         setCartProduct(e);
   }  
}


// Слідкуємо за кліком по корзині
boxCartProducts.onclick = (e) => {

   // Забороняємо стандартний функціонал html
   e.preventDefault();

   // Витягуємо елемент по якому був клік
   let el = e.target;
   
   // Якщо це елемент іконки тоді відбираємо його батьківський елемент
   if (el.classList.contains('icon')) {
      el = el.parentNode;
   }

   // Проблема з svg іконкою, а саме тегом use
   if (el.nodeName == 'use') {
      el = el.parentNode.parentNode;
   }
   
   // Відбираємо дата атрибути цього елементу
   const elData = el.dataset;

   // Відираємо css клас, щоб по ньому відбирати потрібний нам елемент
   const elClass = el.classList;

   // Якщо це елемент категорії починаємо робити наш функціонал
   if (elClass.contains('js-card-remove')) {
      
      // Видаляємо товар з корзини
      cart.splice(elData.id, 1);

      // Виводимо оновлений список товарів
      viewCartProducts();
   }

   // Підрахунок товарів
   if (elClass.contains('js-card-count')) {
      
      // Відбираємо поле з яким будемо працювати
      const input = document.querySelector(elData.forInput);

      // Формуємо кількість
      let count = input.value;
      
      // Відносно типу робимо кількість
      if (elData.type == 'minus') {
         if (count > 1) {
            count--;
         }
      } else {
         count++;  
      }

      // Оновлюємо кількість в полі
      input.value = count;

      // Оновлюємо кількість в масиві
      cart[elData.key].count = count;

      // Зберігаємо дані в localstorage
      localStorage.setItem('cart', JSON.stringify(cart));
   }
}


// Слідкуємо за формою замовлення
if (boxOrderForm) {
   boxOrderForm.onsubmit = (e) => {
         
      // Забороняємо стандартний функціонал html
      e.preventDefault();

      // Витягуємо елемент по якому був клік
      const form = e.target;

      // Збираємо дані з форми, якщо будемо планувати кудись відправляти
      const formdata = new FormData(form);

      
      /**
       *  Місце для fetch відправки данних форми (можна було б в api, але там вже немає місця, далі йде платне добавлення)
       */
      
      // Очищуємо дані корзини
      cart.length = 0;

      // Зберігаємо корзину в localstorage
      localStorage.setItem('cart', JSON.stringify(cart));

      // Після оформлення замовлення видалямо товари в корзині
      viewCartProducts();

      // Ховаємо форму і показуємо успішне відправлення
      form.style.display = 'none';

      // Показуємо блок успішного замовлення
      document.querySelector('.form-success').classList.remove('hidden');
   }
}


// Залишився момент, якщо перейшли на сторінку оформлення замовлення форму потрібно ховати
if (cart.length == 0 && boxOrderForm) {

   // Ховаємо форму і показуємо повідомлення
   boxOrderForm.style.display = 'none';

   // Показуємо повідомлення пустої корзини
   document.querySelector('.form-empty').classList.remove('hidden');
}