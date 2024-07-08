import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Ship } from '../ship';
import { Asteroid } from '../asteroid';
import { InputService } from '../input.service';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  @ViewChild('gameCanvas', { static: true }) gameCanvas!: ElementRef<HTMLCanvasElement>;

  private context: CanvasRenderingContext2D = {} as CanvasRenderingContext2D;
  private asteroids: Asteroid[] = [];
  private ship!: Ship;

  private initializeGame() {
    console.log('initializeGame');
    this.ship = new Ship(this.gameCanvas.nativeElement.width / 2, this.gameCanvas.nativeElement.height / 2);
    const numberOfAsteroids = 5;
    for (let i = 0; i < numberOfAsteroids; i++) {
      const x = Math.random() * this.gameCanvas.nativeElement.width;
      const y = Math.random() * this.gameCanvas.nativeElement.height;
      const size = 20 + Math.random() * 30;
      this.asteroids.push(new Asteroid(x, y, size));
    }

  }

  private updateGame() {
    this.ship.update();
    for (let asteroid of this.asteroids) {
      asteroid.update();
    }
  }

  private drawGame() {
    this.ship.draw(this.context);
    for (let asteroid of this.asteroids) {
      console.log('asteroid', asteroid);
      asteroid.draw(this.context);
    }
  }

  private clearCanvas() {
    this.context.clearRect(0,0, this.gameCanvas.nativeElement.width, this.gameCanvas.nativeElement.height);
   }

  private gameLoop() {
    this.clearCanvas();
    this.updateGame();
    this.drawGame();
    requestAnimationFrame(() => this.gameLoop());
  }

  private handleInput() {
    // if (this.inputService.keys['ArrowUp'] || this.inputService.keys['w']) {
    if (this.inputService.isKeyPressed('ArrowUp')) {
      this.ship.moveForward();
    }
    if (this.inputService.isKeyPressed('ArrowLeft')) {
      this.ship.rotateLeft();
    }
    if (this.inputService.isKeyPressed('ArrowRight')) {
      this.ship.rotateRight();
    }
    if (this.inputService.keys[' ']) {
      // this.ship.shoot();
    }
  }

  constructor(private readonly inputService: InputService) { }


  ngAfterViewInit() {
    if (this.gameCanvas && this.gameCanvas.nativeElement) {
      this.context = this.gameCanvas.nativeElement.getContext('2d')!;
      this.initializeGame();
      requestAnimationFrame(() => this.gameLoop());
      this.handleInput();
    } else {
      console.error('Canvas element is not initialized');
    }
    // this.inputService.keys.effect((key) => {
    //   this.handleInput()
    // })
  }
}
