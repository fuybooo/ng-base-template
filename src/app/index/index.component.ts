import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {UtilService} from '../core/utils/util.service';
import {urls} from '../core/urls.model';
import {HttpRes} from '../core/common.model';
import {Router} from '@angular/router';
import {saveLoginInfo} from '../core/utils/util-project';

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
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      account: [null],
      password: [null]
    });
  }
  login() {
    this.util.post(urls.login, {
      account: this.form.controls.account.value,
      password: this.form.controls.account.password
    }).subscribe((res: HttpRes) => {
      if (res.code === 200) {
        // 保存用户信息
        saveLoginInfo(res.data);
        // 登录成功之后，跳转到首页
        this.router.navigateByUrl('/main');
      }
    });
  }
}
