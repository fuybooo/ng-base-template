import {Routes} from '@angular/router';
import {TimeComponent} from './time/time.component';
import {ArticleComponent} from './article/article.component';
import {ArticleInfoComponent} from './article/article-info/article-info.component';
import {SkinComponent} from './skin/skin.component';
import {DragComponent} from './drag/drag.component';
import {CssWorldComponent} from './css-world/css-world.component';
import {HtmlCssComponent} from './html-css/html-css.component';

export const exampleRoutes: Routes = [
  {
    path: 'time',
    component: TimeComponent,
  },
  {
    path: 'article',
    component: ArticleComponent
  },
  {
    path: 'article/info/:op',
    component: ArticleInfoComponent
  },
  {
    path: 'argicle/info/:op/:id',
    component: ArticleInfoComponent
  },
  {
    path: 'skin',
    component: SkinComponent
  },
  {
    path: 'drag',
    component: DragComponent
  },
  {
    path: 'cssWorld',
    component: CssWorldComponent
  },
  {
    path: 'htmlCss',
    component: HtmlCssComponent
  },
];
