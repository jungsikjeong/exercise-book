var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var dino = {
  x: 30,
  y: 350,
  width: 50,
  height: 50,
  draw() {
    ctx.fillStyle = 'green';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  },
};

class Cactus {
  constructor() {
    this.x = 300;
    this.y = 350; // y값이 낮아지면 위로 올라감
    this.width = 50;
    this.height = 50;
  }

  draw() {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

var animation;
var jumping = false;
var timer = 0;
var cactusArray = [];
var speed = 200;
var jumpTimer = 0;
var spaceCounter = 0;

function animationFrameFun() {
  animation = requestAnimationFrame(animationFrameFun);

  timer++;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  if (timer % 200 === 0) {
    var cactus = new Cactus();
    cactusArray.push(cactus);
  }

  cactusArray.forEach((item, index, all) => {
    // 장애물의 x 좌표가 0보다 작아지면 삭제함
    if (item.x < 0) {
      all.splice(index, 1);
    }

    // 장애물이 충돌하면 정지함.
    // if (isCollision(dino, item)) {
    //   cancelAnimationFrame(animation);
    // }

    item.draw();
    item.x--;
  });

  // 스페이스바 누르면 점프함
  if (jumping === true) {
    dino.y--;
    jumpTimer++;
  }

  if (jumping === false) {
    // 점프해있으면 y값이 작아지는데
    // 이때 y값을 + 해주면 내려옴
    if (dino.y < 350) {
      dino.y++;
    }
  }

  if (jumpTimer > 100) {
    jumping = false;
    jumpTimer = 0;
  }

  dino.draw();
}

function speedFun() {
  speed--;
}

animationFrameFun();

// 충돌좌표 구하는 함수.
// 충돌을 안하면 false를 반환함.
function isCollision(dino, cactus) {
  return (
    cactus.x < dino.x + dino.width &&
    cactus.x + cactus.width > dino.x &&
    cactus.y < dino.y + dino.height &&
    cactus.y + cactus.height > dino.y
  );
}

document.addEventListener('keydown', function (e) {
  if (e.code === 'Space') {
    jumping = true;
  }
});
