import {Routes} from '@angular/router';
import {TimeComponent} from './time/time.component';
import {ArticleComponent} from './article/article.component';

export const exampleRoutes: Routes = [
  {
    path: 'time',
    component: TimeComponent,
  },
  {
    path: 'article',
    component: ArticleComponent
  }
];
