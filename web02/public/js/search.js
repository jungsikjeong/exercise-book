function init() {
  const wrap = document.querySelector('.search-wrap');
  const form = document.querySelector('.search-form');
  const input = document.querySelector('.search-input');
  const row = document.querySelector('.row');
  const notSearch = document.querySelector('.not-search');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/search',
      data: { result: input.value },
    })
      .done((data) => {
        // <!-- 검색했는데 항목이없으면 보여줄 화면 -->
        if (!data.post || data.post.length === 0) {
          notSearch.innerHTML = '';
          if (document.querySelector('.col')) {
            document.querySelector('.col').remove();
          }
          notSearch.innerHTML = `There is no entry for "${input.value}"`;
        } else {
          // <!-- 검색했는데 항목이 있으면 보여줄 화면 -->
          const post = data.post;
          for (let i = 0; i < post.length; i++) {
            // 이미 검색결과가 있으면 그걸 삭제n
            if (row.getElementsByClassName('col')[0]) {
              document.querySelector('.col').remove();
            }

            // 카드에 title이있는지 체크
            if (post[i].title === '' || post[i].title.length === 0) {
              notSearch.innerHTML = '';

              row.insertAdjacentHTML(
                'afterbegin',
                `<div class="col fade-col">
                  <img src="../public/image/${
                    post[i].image
                  }" class="fade-img" />
                  <div class='inner-item ${post[i].category}'>
                    <div>
                      <p class='inner-item-text'>${post[i].text}</p>
                  </div>
                </div>
                <footer class="main-footer">${post[i].date.substring(
                  0,
                  10
                )}</footer>`
              );
            } else {
              notSearch.innerHTML = '';

              row.insertAdjacentHTML(
                'afterbegin',
                `<div class="col fade-col">
                  <img src="../public/image/${
                    post[i].image
                  }" class="fade-img" />
                  <div class='inner-item ${post[i].category}'>
                    <div>
                      <h4>${post[i].title}</h4>
                      <p>${post[i].text}</p>
                  </div>
                </div>
                <footer class="main-footer">${post[i].date.substring(
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
      })
      .fail((request, status, error) => {});
  });
}

init();
