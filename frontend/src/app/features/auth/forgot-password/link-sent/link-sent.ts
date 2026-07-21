import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-link-sent',
  imports: [CommonModule,],
  templateUrl: './link-sent.html',
  styleUrl: './link-sent.css',
})
export class LinkSent {
  time = signal('03:00');

  private totalSeconds = 180;

  constructor() {
    this.startTimer();
  }

  startTimer() {
    setInterval(() => {
      if (this.totalSeconds > 0) {
        this.totalSeconds--;

        const minutes = Math.floor(this.totalSeconds / 60);
        const seconds = this.totalSeconds % 60;

        this.time.set(
          `${minutes.toString().padStart(2, '0')}:${seconds
            .toString()
            .padStart(2, '0')}`
        );
      }
    }, 1000);
  }
}
