function init() {
  const row = document.querySelector('.row');

  let posts;

  fetch('/mypage', {
    method: 'POST',
  })
    .then((response) => response.json())
    .then((data) => {
      posts = data.posts;
      if (posts !== 0 && data) {
        for (let i = 0; i < posts.length; i++) {
          // 카드에 title이있는지 체크
          if (posts[i].title === '' || posts[i].title.length === 0) {
            row.insertAdjacentHTML(
              'afterbegin',
              `<div class="col fade-col" data-id=${posts[i]._id}>
                  <img src="../public/image/${
                    posts[i].image
                  }" class="fade-img" />
                  <div class='inner-item ${posts[i].category}' data-id=${
                posts[i]._id
              }>
                    <div>
                      <p class='inner-item-text' data-id=${posts[i]._id}>${
                posts[i].text
              }</p>
                  </div>
                </div>
                <footer class="main-footer" data-id=${posts[i]._id}>${posts[
                i
              ].date.substring(0, 10)}</footer>`
            );
          } else {
            row.insertAdjacentHTML(
              'afterbegin',
              `<div class="col fade-col" data-id=${posts[i]._id}>
                  <img src="../public/image/${
                    posts[i].image
                  }" class="fade-img" />
                  <div class='inner-item ${posts[i].category}' data-id=${
                posts[i]._id
              }>
                    <div>
                      <h4 data-id=${posts[i]._id}>${posts[i].title}</h4>
                      <p data-id=${posts[i]._id}>${posts[i].text}</p>
                  </div>
                </div>
                <footer class="main-footer" data-id=${posts[i]._id}>${posts[
                i
              ].date.substring(0, 10)}</footer>`
            );
          }

          const inner = document.querySelectorAll('.inner-item ');
          inner.forEach((i) => {
            i.style.backgroundColor = 'pick';
          });
        }
      }

      const cols = document.querySelectorAll('.col');

      cols.forEach((col) => {
        col.addEventListener('click', function (e) {
          const postId = e.target.dataset.id;

          $.ajax({
            method: 'GET',
            url: `/edit/${postId}`,
          }).done((data) => {
            window.location.href = `/edit/${postId}`;
          });
        });
      });

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
