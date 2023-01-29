function init() {
  const head = document.querySelector('.head');
  const menuBtn = document.querySelector('.head-menu-btn');

  const menu = document.createElement('div');
  // const ul = document.createElement('ul');
  // const li = document.createElement('li');
  // const radius = document.createElement('span');
  // const spanList = document.createElement('span');

  // ul.setAttribute('class', 'menu-list');
  // li.setAttribute('class', 'menu-list-item');
  // radius.setAttribute('class', 'radius radius-size');
  // spanList.setAttribute('class', 'name');

  const menuList = `
    <ul class="menu-list">
      <li class="menu-list-item">
        <span class="radius radius-size"></span>
        <span class="name"> Jung-sik, welcome </span>
      </li>
      <li class="menu-list-item">
        <span class="radius radius-size"></span>
        <a class="name"> write card </a>
      </li>
      <li class="menu-list-item">
        <span class="radius radius-size"></span>
        <a href="" class="name">My Page</a>
      </li>
    </ul>
  `;

  menu.classList.add('menu');

  var isOpen = false;

  menuBtn.addEventListener('click', function (e) {
    if (!isOpen) {
      // 메뉴 보임
      head.appendChild(menu);
      menu.classList.remove('close');
      menu.classList.add('open');
      menu.insertAdjacentHTML('beforeend', menuList);
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

init();
