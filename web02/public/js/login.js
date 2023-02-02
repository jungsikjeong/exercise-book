function init() {
  const form = document.querySelector('form');
  const userId = document.querySelector('.user-id');
  const userName = document.querySelector('.user-name');
  const userPassword = document.querySelector('.user-pw');
  const message = document.querySelector('.error-message');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/login',
      data: {
        userId: userId.value,
        password: userPassword.value,
      },
    })
      .done((data) => {
        if (data.success) {
          window.location.href = '/writer';
        }
      })
      .fail((request, status, error) => {
        console.log(request.responseJSON.errors);
        message.innerHTML = request?.responseJSON.errors[0].msg;
      });
  });
}

init();
