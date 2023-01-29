function init() {
  const fadeColumns = document.querySelectorAll('.fade-col');
  const img = document.querySelectorAll('.fade-img');

  var num = 500;

  for (let i = 0; i < fadeColumns.length; i++) {
    img[i].style.opacity = '1';
    fadeColumns[i].style.animationDelay = `${num}ms`;
    num += 75;
  }
}

init();
