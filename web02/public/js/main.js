function init() {
  const row = document.querySelector('.row');

  const decodeUri = decodeURI(window.location?.search);

  fetch(`/list/${decodeUri}`, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.length !== 0 && data) {
        for (let i = 0; i < data.length; i++) {
          // 카드에 title이있는지 체크
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
