import { Routes } from '@angular/router';
import { ElementsPageComponent } from './pages/elements-page.component';
import { GenericPageComponent } from './pages/generic-page.component';
import { HomePageComponent } from './pages/home-page.component';

export const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'generic', component: GenericPageComponent },
  { path: 'elements', component: ElementsPageComponent },
  { path: '**', redirectTo: '' }
];
