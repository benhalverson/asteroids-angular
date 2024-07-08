import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InputService {
  keysSignal = signal<{ [key: string]: boolean }>({});
  constructor() {
    window.addEventListener('keydown', (event) => this.onKeyDown(event));
    window.addEventListener('keyup', (event) => this.onKeyUp(event));
  }

  private onKeyDown(event: KeyboardEvent) {
    this.keysSignal.update((keys) => {
      console.log('keyDown', );
      console.log('event.key', event.key);
      // keys[event.key] = true;
      return keys;
    });
  }

  private onKeyUp(event: KeyboardEvent) {
    this.keysSignal.update((keys) => {
      console.log('keyup', keys)
      keys[event.key] = false;
      return keys;
    });
  }

  isKeyPressed(key: string) {
    return this.keysSignal()[key] || false;
  }

  get keys() {
    return this.keysSignal();
  }

}
