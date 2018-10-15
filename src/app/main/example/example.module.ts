import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { TimeComponent } from './time/time.component';
import {exampleRoutes} from './example.router';
import {ExampleComponent} from './example.component';
import {SharedModule} from '../../shared/shared.module';
import {HttpInterceptorService} from '../../core/http-interceptor.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(exampleRoutes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
  ],
  entryComponents: [],
  declarations: [ExampleComponent, TimeComponent]
})
export class ExampleModule { }
