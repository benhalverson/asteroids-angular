export class Asteroid {
  x: number;
  y: number;
  size: number;
  speed: number;
  direction: number;

  constructor(x: number, y: number, size: number) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = Math.random() * 2 + 1;
    this.direction = Math.random() * 2 * Math.PI;
  }

  update() {
    this.x += this.speed * Math.cos(this.direction);
    this.y += this.speed * Math.sin(this.direction);

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
    context.strokeStyle = 'white';
    context.beginPath();
    context.arc(0, 0, this.size, 0, 2 * Math.PI);
    context.stroke();
    context.restore();
  }
}
