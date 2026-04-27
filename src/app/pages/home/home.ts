import { Component } from '@angular/core';
import { HOME_CONTENT } from '../../core/content/home.content';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  content = HOME_CONTENT;
  isLoaded = false;

  onBackgroundLoaded(): void {
    this.isLoaded = true;
  }
}
