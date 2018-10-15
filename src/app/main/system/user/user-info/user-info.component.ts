import { Component, OnInit } from '@angular/core';
import {FormConfigItem} from '../../../../shared/component/form/form.model';
import {urls} from '../../../../core/urls.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.less']
})
export class UserInfoComponent implements OnInit {
  formConfig: FormConfigItem[][] = [
    [
      {
        label: '姓名',
        field: 'name',
        validators: [
          {
            type: 'required'
          }
        ],
      },
    ],
    [
      {
        label: '登录账号',
        field: 'loginname',
        validators: [
          {
            type: 'required'
          }
        ],
      },
    ]
  ];
  backUrl = '/main/user/list';
  url = urls.user;
  constructor(
  ) { }

  ngOnInit() {
  }

}
