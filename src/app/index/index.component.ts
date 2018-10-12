import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UtilService} from '../core/utils/util.service';
import {urls} from '../core/urls.model';
import {AJAXTYPE, HttpRes, REGEXP} from '../core/common.model';
import {Router} from '@angular/router';
import {saveLoginInfo} from '../core/utils/util-project';
import {getSql} from '../core/utils/util-sql';
import {NzMessageService} from 'ng-zorro-antd';
import {getSpecialCharacterValidator, required} from '../core/utils/util-validate';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.less']
})
export class IndexComponent implements OnInit {
  logoText = 'logo标题';
  form;

  constructor(
    private fb: FormBuilder,
    private util: UtilService,
    private router: Router,
    private message: NzMessageService
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      loginname: [null, [required, getSpecialCharacterValidator(REGEXP.charORNumber, false)]],
      password: [null, [required, getSpecialCharacterValidator(REGEXP.pwd, false)]]
    });
  }

  login() {
    if (this.form.invalid) {
      this.message.error('请输入正确的用户名密码');
      return;
    }
    const params = this.form.value;
    this.util.post(urls.login, {
      ...params,
      ...getSql(urls.login.url, AJAXTYPE.POST, params)
    }).subscribe((res: HttpRes) => {
      if (res.code === 200) {
        if (res.data.results[0][0]) {
          // 保存用户信息
          saveLoginInfo(res.data.results[0][0]);
          // 登录成功之后，跳转到首页
          this.router.navigateByUrl('/main/permission/list');
        } else {
          this.message.error('用户名密码错误');
        }
      }
    });
  }
}
