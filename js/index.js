class Game {
  constructor(canvas, context, field, player) {
    this.canvas = canvas;
    this.context = context;
    this.field = field;
    this.player = player;
    this.obstacles = [];
    this.speed = 3;
    this.carSpeed = {
      initialSpeed: 0,
      speedIncrement: 2,
    };
  }

  configureKeyControls() {
    document.onkeydown = (event) => {
      this.carSpeed.initialSpeed += this.carSpeed.speedIncrement;

      this.player.movePlayer(event.keyCode, this.carSpeed.initialSpeed);
    };

    document.onkeyup = () => {
      this.carSpeed.initialSpeed = 0;
    };
  }
  startGame() {
    this.clearField();
    this.field.drawField();
    this.field.moveField(this.speed);
    this.player.drawPlayer();
    this.obstacles.drawObstacle();
    window.requestAnimationFrame(() => this.startGame());
  }

  clearField() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");

    const fieldImg = new Image();

    fieldImg.src = "./images/road.png";

    const carImg = new Image();

    carImg.src = "./images/car.png";

    fieldImg.onload = () => {
      carImg.onload = () => {
        const field = new Field(
          canvas,
          context,
          0,
          0,
          canvas.width,
          canvas.height,
          fieldImg
        );

        const player = new Player(canvas, context, 150, 500, 80, 160, carImg);
        const game = new Game(canvas, context, field, player);

        game.configureKeyControls();
        game.startGame();
      };
    };
  };
};
