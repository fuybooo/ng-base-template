import { Component, OnInit } from '@angular/core';
import {guid} from '../../../../../core/utils/util-fns';
import {FormGroup} from '@angular/forms';
import {FormConfigItem, FORMEVENT} from '../../../../../shared/component/form/form.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-permission-user-info',
  templateUrl: './permission-user-info.component.html',
  styleUrls: ['./permission-user-info.component.less']
})
export class PermissionUserInfoComponent implements OnInit {
  op;
  id;
  titleText;
  showForm = false;
  formId = guid();
  form = new FormGroup({});
  formConfig: FormConfigItem[][] = [
    [
      {
        type: 'commonSelect',
        label: '用户',
        field: 'username',
        validators: [
          {
            type: 'required'
          }
        ]
      },
    ],
    [
      {
        type: 'commonSelect',
        label: '权限',
        field: 'permission',
        validators: [
          {
            type: 'required'
          }
        ]
      },
    ]
  ];
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.op = this.route.snapshot.params.op;
    this.id = this.route.snapshot.params.id;
    if (this.op === 'add') {
      this.titleText = '新增';
      this.showForm = true;
      // 新增时需要初始化表单
    } else if (this.op === 'edit') {
      this.titleText = '编辑';
      this.showForm = true;
    }
  }
  save() {
    this.back();
  }
  back() {
    this.router.navigateByUrl('/main/permission-user/list');
  }
}
