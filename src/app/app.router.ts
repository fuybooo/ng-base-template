import {Routes} from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';

export const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/index'
  },
  {
    path: 'index',
    loadChildren: `./index/index.module#IndexModule`,
    data: {
      title: 'index'
    }
  },
  {
    path: 'main',
    loadChildren: `./main/main.module#MainModule`
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
