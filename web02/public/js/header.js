function init() {
  const head = document.querySelector('.head');
  const loginAndAbout = document.querySelector('.login-and-about');
  const listItems = document.querySelectorAll('.head-list-item');

  const menu = document.createElement('div');

  const loginHtml = `<a href="/login"><span class="head-menu-btn">LOGIN</span></a>`;
  const aboutHtml = `<span class="head-menu-btn">ABOUT</span>`;

  menu.classList.add('menu');

  // 헤더에서 카테고리 선택시 가져올 데이터들
  listItems.forEach((item) => {
    item.addEventListener('click', function (e) {
      $.ajax({
        method: 'POST',
        url: `/search?value=${e.target.textContent}`,
      })
        .done((data) => {
          console.log(data);
          window.location.replace('/?value=' + e.target.textContent);
        })
        .fail((xhr, code, err) => {
          console.log(err);
        });
    });
  });

  // 유저가 로그인했는지 체크
  $.post('/isuser').then((data) => {
    if (!data.success) {
      loginAndAbout.insertAdjacentHTML('afterbegin', loginHtml);
    } else {
      loginAndAbout.insertAdjacentHTML('afterbegin', aboutHtml);

      const menuBtn = document.querySelector('.head-menu-btn');

      const menuList = `
      <ul class="menu-list">
        <li class="menu-list-item">
          <span class="radius radius-size"></span>
          <span class="name"> ${data.user.name}, welcome! </span>
        </li>
        <li class="menu-list-item">
          <span class="radius radius-size"></span>
          <a href='/writer' class="name"> write card </a>
        </li>
        <li class="menu-list-item">
          <span class="radius radius-size"></span>
          <a href='/mypage' class="name">My Page</a>
        </li>
        <li class="menu-list-item">
          <span class="radius radius-size"></span>
          <span class="name logout">Log Out</span>
        </li>
      </ul>
    `;

      var isOpen = false;

      menuBtn.addEventListener('click', function (e) {
        if (!isOpen) {
          // 메뉴 보임
          head.appendChild(menu);
          menu.classList.remove('close');
          menu.classList.add('open');
          menu.insertAdjacentHTML('beforeend', menuList);

          const logout = document.querySelector('.logout');

          logout.addEventListener('click', function (e) {
            $.ajax({
              method: 'GET',
              url: `/logout`,
            })
              .done((data) => {
                window.location.href = '/';
              })
              .fail((xhr, code, err) => {
                console.log(err);
              });
          });

          isOpen = true;
        } else if (isOpen) {
          // 메뉴 숨김
          const list = document.querySelector('.menu-list');
          list.remove();
          menu.classList.remove('open');
          menu.classList.add('close');

          isOpen = false;
        }
      });
    }
  });
}

init();
