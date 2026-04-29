import { Component } from '@angular/core';
import { HOME_CONTENT } from '../../core/content/home.content';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
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
