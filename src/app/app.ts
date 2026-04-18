import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly vendorScripts = [
    '/assets/js/jquery.min.js',
    '/assets/js/jquery.scrollex.min.js',
    '/assets/js/jquery.scrolly.min.js',
    '/assets/js/browser.min.js',
    '/assets/js/breakpoints.min.js',
    '/assets/js/util.js'
  ];

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        window.setTimeout(() => {
          void this.initializeTemplateScripts();
        }, 0);
      });
  }

  private async initializeTemplateScripts(): Promise<void> {
    this.document.body.classList.add('is-preload');
    this.document.getElementById('navPanel')?.remove();
    this.document.getElementById('navPanelToggle')?.remove();
    this.vendorScripts.forEach((src) => this.removeScript(src));

    for (const src of this.vendorScripts) {
      await this.appendScript(src);
    }

    this.removeScript('/assets/js/main.js');
    await this.appendScript('/assets/js/main.js');
  }

  private appendScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const script = this.document.createElement('script');
      script.src = src;
      script.async = false;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Unable to load script: ${src}`));
      this.document.body.appendChild(script);
    });
  }

  private removeScript(src: string): void {
    this.document
      .querySelectorAll(`script[src="${src}"]`)
      .forEach((script) => script.remove());
  }
}
