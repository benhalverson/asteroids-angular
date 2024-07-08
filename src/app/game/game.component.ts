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
    this.ship = new Ship(400, 300);
    for (let i = 0; i < 10; i++) {
      this.asteroids.push(
        new Asteroid(
          Math.random() * 800,
          Math.random() * 600,
          Math.random() * 40 + 20
        )
      );
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
      asteroid.draw(this.context);
    }
  }

  private clearCandvas() { }

  private gameLoop() {
    this.clearCandvas();
    this.updateGame();
    this.drawGame();
    requestAnimationFrame(() => this.gameLoop());
  }

  private handleInput() {
    // if (this.inputService.keys['ArrowUp'] || this.inputService.keys['w']) {
    if (this.inputService.keys['ArrowUp']) {
      this.ship.moveForward();
    }
    if (this.inputService.keys['ArrowLeft']) {
      this.ship.rotateLeft();
    }
    if (this.inputService.keys['ArrowRight']) {
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
