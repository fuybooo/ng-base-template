import { NgModule } from '@angular/core';
import {MainComponent} from './main.component';
import {RouterModule} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpInterceptorService} from '../core/http-interceptor.service';
import {mainRoutes} from './main.router';
import { SettingComponent } from './setting/setting.component';
import { PermissionComponent } from './setting/permission/permission.component';
import { PermissionInfoComponent } from './setting/permission/permission-info/permission-info.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(mainRoutes)
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
  ],
  entryComponents: [],
  declarations: [MainComponent, SettingComponent, PermissionComponent, PermissionInfoComponent]
})
export class MainModule { }
