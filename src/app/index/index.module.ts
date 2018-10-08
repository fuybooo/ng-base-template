import { NgModule } from '@angular/core';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpInterceptorService} from '../core/http-interceptor.service';
import {IndexComponent} from './index.component';
import {indexRoutes} from './index.router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(indexRoutes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
  ],
  entryComponents: [],
  declarations: [IndexComponent]
})
export class IndexModule { }
