import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';

/* 设置本地语言 */
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';
import {PreloadAllModules, RouterModule} from '@angular/router';
import {appRoutes} from './app.router';
registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    CoreModule,
    RouterModule.forRoot(appRoutes, {
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
