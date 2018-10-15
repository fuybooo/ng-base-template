import { Component, OnInit } from '@angular/core';
import {FormConfigItem} from '../../../../../../shared/component/form/form.model';
import {urls} from '../../../../../../core/urls.model';
import {ActivatedRoute} from '@angular/router';
import {UtilService} from '../../../../../../core/utils/util.service';
import {getSql} from '../../../../../../core/utils/util-sql';
import {AJAXTYPE, HttpRes} from '../../../../../../core/common.model';

@Component({
  selector: 'app-permission-user-info',
  templateUrl: './permission-user-info.component.html',
  styleUrls: ['./permission-user-info.component.less']
})
export class PermissionUserInfoComponent implements OnInit {
  formConfig: FormConfigItem[][] = [[]];
  defFormConfig: FormConfigItem[][] = [
    [
      {
        type: 'commonSelect',
        label: '用户',
        field: 'userid',
        validators: [
          {
            type: 'required'
          }
        ],
        special: 'permission-user'
      },
    ],
    [
      {
        type: 'commonSelect',
        label: '权限',
        field: 'permissionid',
        validators: [
          {
            type: 'required'
          }
        ],
        optionLabel: 'name',
        url: urls.permission
      },
    ]
  ];
  backUrl = '/main/permission-user/list';
  url = urls.permissionUser;
  constructor(
    private route: ActivatedRoute,
    private util: UtilService
  ) { }

  ngOnInit() {
    const op = this.route.snapshot.params.op;
    const id = this.route.snapshot.params.id;
    if (op === 'edit') {
      const params = {permissionid: id};
      this.util.get(urls.user, {
        ...params,
        ...getSql(urls.user.url, AJAXTYPE.GET, params)
      }).subscribe((res: HttpRes) => {
        if (res.code === 200) {
          this.formConfig = this.defFormConfig;
          this.formConfig[0][0] = {
            isNotSimpleSet: true,
            colType: 'view',
            label: '用户',
            field: 'userid',
            defaultValue: res.data.results[0][0].name
          };
        }
      });
    } else {
      this.formConfig = this.defFormConfig;
    }
  }
}
