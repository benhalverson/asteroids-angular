export class Ship {
  x: number;
  y: number;
  angle: number;
  speed: number;
  rotationSpeed: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.angle = 0;
    this.speed = 0;
    this.rotationSpeed = 0.1;
  }

  update() {
    this.x += this.speed * Math.cos(this.angle);
    this.y += this.speed * Math.sin(this.angle);

    if (this.x < 0) {
      this.x = 800;
    }

    if (this.x > 800) {
      this.x -= 800;
    }

    if (this.y < 0) {
      this.y += 600;
    }

    if (this.y > 600) {
      this.y -= 600;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.strokeStyle = 'white';
    context.beginPath();
    context.moveTo(0, -10);
    context.lineTo(5, 10);
    context.lineTo(-5, 10);
    context.closePath();
    context.stroke();
    context.restore();
  }

  moveForward() {
    this.speed = 2;
  }

  rotateLeft() {
    this.angle -= this.rotationSpeed;
  }

  rotateRight() {
    this.angle += this.rotationSpeed;
  }


}
