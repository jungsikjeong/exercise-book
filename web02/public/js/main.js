function init() {
  const row = document.querySelector('.row');

  // `<div class="col fade-col">
  // <img src="../public/image/민지1.jpg" class="fade-img" />
  // <div class="inner-item">
  //   <div>
  //     <h4>뉴진스</h4>
  //     <p>민지짱</p>
  //   </div>
  // </div>
  // <footer class="main-footer">23.1.28</footer>`

  const decodeUri = decodeURI(window.location?.search);
  console.log(decodeUri);

  fetch(`/list/${decodeUri}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.length !== 0 && data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].title === '' || data[i].title.length === 0) {
            row.insertAdjacentHTML(
              'afterbegin',
              `<div class="col fade-col">
                <img src="../public/image/${data[i].image}" class="fade-img" />
                <div class='inner-item ${data[i].category}'>
                  <div>
                    <p class='inner-item-text'>${data[i].text}</p>
                </div>
              </div>
              <footer class="main-footer">${data[i].date.substring(
                0,
                10
              )}</footer>`
            );
          } else {
            row.insertAdjacentHTML(
              'afterbegin',
              `<div class="col fade-col">
                <img src="../public/image/${data[i].image}" class="fade-img" />
                <div class='inner-item ${data[i].category}'>
                  <div>
                    <h4>${data[i].title}</h4>
                    <p>${data[i].text}</p>
                </div>
              </div>
              <footer class="main-footer">${data[i].date.substring(
                0,
                10
              )}</footer>`
            );
          }

          const inner = document.querySelectorAll('.inner-item ');
          inner.forEach((i) => {
            i.style.backgroundColor = 'pick';
          });
        }
      }

      const fadeColumns = document.querySelectorAll('.fade-col');
      const img = document.querySelectorAll('.fade-img');

      var num = 500;

      for (let i = 0; i < fadeColumns.length; i++) {
        fadeColumns[i].style.animationDelay = `${num}ms`;
        num += 75;
      }
    });
}

init();

function dateFun(date) {
  if (typeof date !== 'string') {
    console.log(date);
  }
  // const year = date.substring(2, 4);
  // const month = date.substring(5, 7);
  // const day = date.substring(8, 10);

  // // return year + '.' + month + '.' + day;
  // console.log(year + '.' + month + '.' + day);
}
