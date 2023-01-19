function init() {
  const searchForm = document.querySelector('.search-form');
  const search = document.querySelector('.search');
  const productList = document.querySelector('.product-list');
  const dragScreen = document.querySelector('.drag-screen');
  const dragTitle = document.querySelector('.drag-screen-title');
  const basket = document.querySelector('.basket');

  let products = [];
  let carts = [];

  // 상품 가져오기
  fetch('./data/store.json')
    .then((res) => res.json())
    .then((data) => {
      products = data.products;
      //   carts = data.products;

      data.products.forEach((product) =>
        productList.insertAdjacentHTML(
          'beforeend',
          `
        <div class="product-item" draggable="true" data-id="${product.id}">
                <img src=${product.photo} alt="" />
                <h5 class="title">${product.title}</h5>
                <p class="brand">${product.brand}</p>
                <p class="price">가격 :${product.price}</p>
                <div>
                <button class="button add">담기</button>
                </div>
        </div> `
        )
      );

      // 상품 검색
      searchForm.addEventListener('submit', function (e) {
        var searchText = search.value;

        e.preventDefault();

        products.forEach((item) => {
          if (item.title.includes(searchText) && searchText !== '') {
            productList.innerHTML = '';

            let title = item.title;
            title = title.replace(
              item.title,
              `<span style="background : yellow">${item.title.slice(
                0,
                2
              )}</span>${item.title.slice(2)}`
            );

            productList.insertAdjacentHTML(
              'beforeend',
              `
          <div class="product-item" draggable="true" data-id="${item.id}">
                  <img src=${item.photo} alt="" />
                  <h5 class="title">${title}</h5>
                  <p class="brand">${item.brand}</p>
                  <p class="price">가격: ${item.price}</p>
                  <div>
                  <button class="button add">담기</button>
                  </div>
          </div> `
            );
          }
        });
      });

      // 장바구니 담기버튼 클릭 이벤트
      const add = document.querySelectorAll('.add');

      add.forEach((i) => {
        i.addEventListener('click', (e) => {
          dragTitle.classList.add('hide');

          let productId = e.target.parentNode.parentNode.dataset.id;

          let findNum = carts.findIndex((num) => num.id == productId);

          if (findNum === -1) {
            let currentProduct = products.find((product) => {
              return product.id == productId;
            });

            currentProduct.count = 1;
            carts.push(currentProduct);
          } else {
            carts[findNum].count++;
          }

          // 요소가 계속 추가됨 문제있음
          carts.forEach((cart) => {
            dragScreen.insertAdjacentHTML(
              'beforeend',
              `
                    <div class="product-item product-cart-item" draggable="true" ondragstart="drag(event)">
                        <img src=${cart.photo} alt="" />
                        <h5 class="title">${cart.title}</h5>
                        <p class="brand">${cart.brand}</p>
                        <p class="price">${cart.price}</p>
                        <div>
                        <input type="number" value=${cart.count} >
                        </div>
                    </div>`
            );
          });
        });
      });

      // 상품 드래그 앤 드랍
      dragScreen.addEventListener('dragover', allowDrop);
      dragScreen.addEventListener('drop', drop);
      productList.addEventListener('dragstart', dragStart);

      function allowDrop(e) {
        e.preventDefault();
      }

      function dragStart(e) {
        e.dataTransfer.setData('id', e.target.dataset.id);
      }

      function drop(e) {
        e.preventDefault();
        const productItem = document.querySelectorAll('.product-item');

        var data = e.dataTransfer.getData('id');

        let findNum = carts.findIndex((num) => num.id == data);

        if (findNum === -1) {
          let currentProduct = products.find((a) => {
            return a.id == parseInt(data);
          });

          currentProduct.count = 1;
          carts.push(currentProduct);
        } else {
          carts[findNum].count++;
        }

        for (var i = 0; i < productItem.length; i++) {
          if (productItem[i].dataset.id === data) {
            dragTitle.classList.add('hide');
            // console.log(data);

            // console.log(productItem[i].dataset.id);

            carts.forEach((cart) => {
              if (cart.id.toString() === data) {
                e.target.insertAdjacentHTML(
                  'beforeend',
                  `
                <div class="product-item product-cart-item" draggable="true" ondragstart="drag(event)">
                    <img src=${cart.photo} alt="" />
                    <h5 class="title">${cart.title}</h5>
                    <p class="brand">${cart.brand}</p>
                    <p class="price">${cart.price}</p>
                    <div>
                    <input type="number" value=${cart.count}>
                    </div>
                </div>`
                );
              }
            });
          }
        }
      }
    });
}

init();
