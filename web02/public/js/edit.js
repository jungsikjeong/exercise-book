function init() {
  const titleAdd = document.querySelector('.title-add');
  const form = document.querySelector('.form-wrap');
  const text = document.querySelector('.post-body');
  const categoryInput = document.querySelectorAll('.category-input');
  const pictureBtn = document.querySelector('.pictureBtn');
  const fileElement = document.querySelector('.file');
  const fileWrap = document.querySelector('.file-wrap');
  const editImage = document.querySelector('.edit-image');
  const imgBox = document.querySelector('.img-box');

  const inputElement = `<input
          type="text"
          name="title"
          placeholder="제목을 입력해주세요"
          class="title"
          />`;

  let fileName;
  let file;
  // 데이터를 받아옴 그래야, file image를 얻어올 수 있어서..
  // GET으로 요청하고 console.log(data)하면 계속 페이지의 html을 보여줌 -ㅅ-
  // 그러면 GET요청으로 ejs파일에 데이터를 랜더링하고,
  // POST 요청으로 데이터를 받아오고 ,PUT으로 데이터를 수정해야하는 상황이 벌어지지만 어쩔수없음..
  const location = window.location.pathname;
  fetch(location, {
    method: 'POST',
  })
    .then((response) => response.json())
    .then((data) => {
      fileName = data.post.image;
    });

  // 누르면 화면에 타이틀 input 생성됨
  if (titleAdd) {
    titleAdd.addEventListener('click', function (e) {
      titleAdd.style.display = 'none';
      form.insertAdjacentHTML('afterbegin', inputElement);
    });
  }

  // 카테고리 선택시 이벤트 작동함
  let categoryValue = '민지';
  let titleText = '';
  let textBody = text.value;

  categoryInput.forEach((category) => {
    category.addEventListener('change', function (e) {
      editImage.innerHTML = '';
      categoryValue = e.target.value;
    });
  });

  // textarea 작성시 이벤트 작동
  text.addEventListener('change', function (e) {
    textBody = e.target.value;
  });

  fileElement.addEventListener('change', function (e) {
    file = e.target.files[0];

    let formData = new FormData();
    formData.enctype = 'multipart/form-data';
    formData.append('file', file);

    fetch('/upload', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          fileName = data.fileInfo.filename;
          // imgBox.removeChild(edit-image);

          imgBox.innerHTML = '';
          imgBox.insertAdjacentHTML(
            'beforeend',
            `<img src='../public/image/${fileName}' class="edit-image" />`
          );
        }
      });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.querySelector('.title');

    if (title) {
      titleText = title.value;

      title.addEventListener('keydown', function (e) {
        if (e.keyCode === 13) {
          e.preventDefault();
        }
      });
    }

    if (textBody === '') {
      return alert('카드의 내용을 입력해주세요!');
    }

    $.ajax({
      method: 'PUT',
      url: location,
      data: {
        titleText,
        textBody,
        categoryValue,
        fileName,
      },
    })
      .done((data) => {
        if (data.success) {
          window.location.href = '/mypage';
        }
      })
      .fail((request, status, error) => {
        console.log(request.responseJSON.errors);
      });
  });
}

init();
