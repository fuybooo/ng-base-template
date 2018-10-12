import {Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {AuthGuardService} from '../shared/guard/auth-guard.service';
import {SettingComponent} from './setting/setting.component';
import {PermissionComponent} from './setting/permission/permission.component';
import {PermissionInfoComponent} from './setting/permission/permission-info/permission-info.component';
import {PermissionUserComponent} from './setting/permission/permission-user/permission-user.component';
import {PermissionUserInfoComponent} from './setting/permission/permission-user/permission-user-info/permission-user-info.component';
import {UserComponent} from './user/user.component';
import {UserInfoComponent} from './user/user-info/user-info.component';
import {MenuResolver} from '../shared/guard/menu-resolver.service';

export const mainRoutes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    resolve: {
      menu: MenuResolver
    },
    component: MainComponent,
    children: [
      {
        path: '',
        component: SettingComponent,
        children: [
          {
            path: 'permission/list',
            component: PermissionComponent
          },
          {
            path: 'permission/info/:op',
            component: PermissionInfoComponent
          },
          {
            path: 'permission/info/:op/:id',
            component: PermissionInfoComponent
          },
          {
            path: 'permission-user/list',
            component: PermissionUserComponent
          },
          {
            path: 'permission-user/info/:op',
            component: PermissionUserInfoComponent
          },
          {
            path: 'permission-user/info/:op/:id',
            component: PermissionUserInfoComponent
          },
        ]
      },
      {
        path: 'user/list',
        component: UserComponent
      },
      {
        path: 'user/info/:op',
        component: UserInfoComponent
      },
      {
        path: 'user/info/:op/:id',
        component: UserInfoComponent
      },
    ]
  }
];
