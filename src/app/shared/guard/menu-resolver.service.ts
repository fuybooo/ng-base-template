import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {getLoginInfo} from '../../core/utils/util-project';
import {UtilService} from '../../core/utils/util.service';
import {urls} from '../../core/urls.model';
import {getSql} from '../../core/utils/util-sql';
import {AJAXTYPE, HttpRes} from '../../core/common.model';
import {map} from 'rxjs/internal/operators';
import {NzMessageService} from 'ng-zorro-antd';
import {CoreService} from '../../core/core.service';

@Injectable()
export class MenuResolver implements Resolve<any> {

  constructor(private util: UtilService,
              private router: Router,
              private message: NzMessageService,
              private core: CoreService
              ) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.core.getUserMenu().pipe(map((res: HttpRes) => {
      if (res.code === 200) {
        const menus = res.data.results[0];
        if (menus.length) {
          return menus;
        } else {
          this.message.error('该用户没有权限');
          this.router.navigateByUrl('/index');
          return null;
        }
      } else {
        this.message.error('该用户没有权限');
        this.router.navigateByUrl('/index');
        return null;
      }
    }));
  }
}
