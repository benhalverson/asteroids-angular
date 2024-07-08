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

  update() {}

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
