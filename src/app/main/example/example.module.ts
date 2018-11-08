import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { TimeComponent } from './time/time.component';
import {exampleRoutes} from './example.router';
import {ExampleComponent} from './example.component';
import {SharedModule} from '../../shared/shared.module';
import {HttpInterceptorService} from '../../core/http-interceptor.service';
import { ArticleComponent } from './article/article.component';
import { ArticleInfoComponent } from './article/article-info/article-info.component';
import { SkinComponent } from './skin/skin.component';
import { DragComponent } from './drag/drag.component';
import { CssWorldComponent } from './css-world/css-world.component';
import {ArticleService} from './article/article.service';
import { HtmlCssComponent } from './html-css/html-css.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(exampleRoutes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    ArticleService
  ],
  entryComponents: [],
  declarations: [ExampleComponent, TimeComponent, ArticleComponent, ArticleInfoComponent, SkinComponent, DragComponent, CssWorldComponent, HtmlCssComponent]
})
export class ExampleModule { }
