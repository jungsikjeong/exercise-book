function init() {
  const titleAdd = document.querySelector('.title-add');
  const form = document.querySelector('.form-wrap');
  const text = document.querySelector('.post-body');
  const categoryInput = document.querySelectorAll('.category-input');
  const pictureBtn = document.querySelector('.pictureBtn');
  const fileElement = document.querySelector('.file');

  const inputElement = `<input
        type="text"
        name="title"
        placeholder="제목을 입력해주세요"
        class="title"
        />`;

  // 누르면 화면에 타이틀 input 생성됨
  titleAdd.addEventListener('click', function (e) {
    titleAdd.style.display = 'none';
    form.insertAdjacentHTML('afterbegin', inputElement);
  });

  // 카테고리 선택시 이벤트 작동함
  let categoryValue = '민지';
  let titleText = '';
  let textBody = '';
  let image = '';

  categoryInput.forEach((category) => {
    category.addEventListener('change', function (e) {
      categoryValue = e.target.value;
    });
  });

  // textarea 작성시 이벤트 작동
  text.addEventListener('change', function (e) {
    textBody = e.target.value;
  });

  pictureBtn.addEventListener('click', function (e) {
    e.preventDefault();

    const div = document.createElement('div');
    div.setAttribute('class', 'picture-wrap');
  });

  let file;
  let fileName;

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
      alert('카드의 내용을 입력해주세요!');
    }

    if (fileName === '' || !fileName) {
      alert('카드이미지를 선택해주세요!');
    }

    $.ajax({
      method: 'POST',
      url: '/writer',
      data: {
        titleText,
        textBody,
        categoryValue,
        fileName,
      },
    })
      .done((data) => {
        if (data.success) {
          categoryValue = '민지';
          titleText = '';
          textBody = '';
          window.location.href = '/';
        }
      })
      .fail((request, status, error) => {
        console.log(request.responseJSON.errors);
      });
  });
}

init();
