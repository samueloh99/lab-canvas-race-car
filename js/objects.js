class Object {
  constructor(canvas, context, posX, posY, width, height) {
    this.canvas = canvas;
    this.context = context;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
  }
}

class Field extends Object {
  constructor(canvas, context, posX, posY, width, height, image) {
    super(canvas, context, posX, posY, width, height);
    this.image = image;
  }

  drawField() {
    this.context.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );

    this.context.drawImage(
      this.image,
      this.posX,
      this.posY - this.height,
      this.width,
      this.height
    );

    this.resetFieldPos();
  }

  moveField(speed) {
    this.posY += speed;
  }

  resetFieldPos() {
    if (this.posY > this.height) {
      this.posY = 0;
    }
  }
}

class Obstacle extends Object {
  constructor(canvas, context, posX, posY, width, height, color) {
    super(canvas, context, posX, posY, width, height);
    this.color = color;
  }

  drawObstacle() {
    this.context.fillRect(this.posX, this.posY, this.width, this.height);
  }
}

class Player extends Object {
  constructor(canvas, context, posX, posY, width, height, image) {
    super(canvas, context, posX, posY, width, height);
    this.image = image;
  }

  drawPlayer() {
    this.context.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }

  movePlayer(key, speed) {
    switch (key) {
      case 37:
        if (this.posX < 60) return;
        this.posX -= speed;
        break;
      case 39:
        if (this.posX > this.canvas.width - 111) return;
        this.posX += speed;
        break;
      default:
        console.log("invalid key");
    }
  }
}
