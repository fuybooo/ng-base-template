import {Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {AuthGuardService} from '../shared/guard/auth-guard.service';
import {SettingComponent} from './system/setting/setting.component';
import {PermissionComponent} from './system/setting/permission/permission.component';
import {PermissionInfoComponent} from './system/setting/permission/permission-info/permission-info.component';
import {PermissionUserComponent} from './system/setting/permission/permission-user/permission-user.component';
import {PermissionUserInfoComponent} from './system/setting/permission/permission-user/permission-user-info/permission-user-info.component';
import {UserComponent} from './system/user/user.component';
import {UserInfoComponent} from './system/user/user-info/user-info.component';
import {MenuResolver} from '../shared/guard/menu-resolver.service';
import {MenuComponent} from './system/menu/menu.component';

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
        path: 'example',
        loadChildren: `./example/example.module#ExampleModule`
      },
      {
        path: '',
        component: SettingComponent,
        children: [
          {
            path: 'permission/list',
            component: PermissionComponent,
          },
          {
            path: 'permission/info/:op',
            component: PermissionInfoComponent,
          },
          {
            path: 'permission/info/:op/:id',
            component: PermissionInfoComponent,
          },
          {
            path: 'permission-user/list',
            component: PermissionUserComponent,
          },
          {
            path: 'permission-user/info/:op',
            component: PermissionUserInfoComponent,
          },
          {
            path: 'permission-user/info/:op/:id',
            component: PermissionUserInfoComponent,
          }
        ]
      },
      {
        path: 'user/list',
        component: UserComponent,
      },
      {
        path: 'user/info/:op',
        component: UserInfoComponent,
      },
      {
        path: 'user/info/:op/:id',
        component: UserInfoComponent,
      },
      {
        path: 'menu',
        component: MenuComponent,
      }
    ]
  },
];
