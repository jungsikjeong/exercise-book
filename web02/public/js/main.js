function init() {
  const fadeColumns = document.querySelectorAll('.fade-col');
  const img = document.querySelectorAll('.fade-img');

  var num = 500;

  for (let i = 0; i < fadeColumns.length; i++) {
    fadeColumns[i].style.animationDelay = `${num}ms`;
    num += 75;
  }

  // 로그인 됬는지 확인하는 코드
  // $.ajax({
  //   method: 'GET',
  //   url: '/',
  // })
  //   .done((data) => {
  //     console.log(data);
  //   })
  //   .fail((request, status, error) => {
  //     console.log(request.responseJSON.errors);
  //   });
}

init();
