import {Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {AuthGuardService} from '../shared/guard/auth-guard.service';
import {SettingComponent} from './setting/setting.component';
import {PermissionComponent} from './setting/permission/permission.component';
import {PermissionInfoComponent} from './setting/permission/permission-info/permission-info.component';

export const mainRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: MainComponent,
    children: [
      {
        path: '',
        component: SettingComponent,
        children: [
          {
            path: '',
            component: PermissionComponent
          },
          {
            path: 'permission/:op',
            component: PermissionInfoComponent
          },
          {
            path: 'permission/:op/:id',
            component: PermissionInfoComponent
          },
        ]
      }
    ]
  }
];
