var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var img1 = new Image();
img1.src = 'cactus.png';
var img2 = new Image();
img2.src = 'dinosaur.png';

var dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);

    ctx.drawImage(img2, this.x, this.y, this.width, this.height);
  },
};

// 클래스로 만드는게 일반적임
class Cactus {
  constructor() {
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(img1, this.x, this.y, img1.width, this.height);
  }
}

var timer = 0;
var cactusArray = [];
var jumpTimer = 0;
var animation;

function 프레임마다실행할거() {
  animation = requestAnimationFrame(프레임마다실행할거);
  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (timer % 200 === 0) {
    var cactus = new Cactus();
    cactusArray.push(cactus);
  }

  cactusArray.forEach((item, index, all) => {
    // x좌표가 0미만이면 제거
    if (item.x < 0) {
      all.splice(index, 1);
    }

    item.x--;

    collisionCheck(dino, item);

    item.draw();
  });

  if (jumping === true) {
    dino.y--;

    jumpTimer++;
  }

  if (jumping === false) {
    // dino.y가 200px보다 밑으로 존재하게되면 y 상승 그만
    // y값이 올라가면 요소가 밑으로 내려감

    if (dino.y < 200) {
      dino.y++;
    }
  }

  if (jumpTimer > 60) {
    jumping = false;
    jumpTimer = 0;
  }

  dino.draw();
}

프레임마다실행할거();

// 충돌확인
function collisionCheck(dino, cactus) {
  var x축차이 = cactus.x - (dino.x + dino.width);
  var y축차이 = cactus.y - (dino.y + dino.height);

  if (x축차이 < 0 && y축차이 < 0) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    cancelAnimationFrame(animation);
  }
}

var jumping = false;

document.addEventListener('keydown', function (e) {
  if (e.code === 'Space') {
    jumping = true;
  }
});
