import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {guid} from '../../../../core/utils/util-fns';
import {UrlConfig, urls} from '../../../../core/urls.model';
import {FormConfigItem, simpleSetForm} from '../../form/form.model';
import {UtilService} from '../../../../core/utils/util.service';
import {AJAXTYPE, HttpRes} from '../../../../core/common.model';
import {getSql} from '../../../../core/utils/util-sql';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-common-info-page',
  templateUrl: './common-info-page.component.html',
  styleUrls: ['./common-info-page.component.less']
})
export class CommonInfoPageComponent implements OnInit {
  @Input() formConfig: FormConfigItem[][];
  @Input() backUrl: string;
  @Input() url: UrlConfig;
  op;
  id;
  titleText;
  showForm = false;
  formId = guid();
  form = new FormGroup({});
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private util: UtilService,
    private message: NzMessageService
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
      this.searchInfoDetail();
    }
  }
  searchInfoDetail() {
    this.util.get(this.url, {id: this.id, ...getSql(this.url.url, AJAXTYPE.GET, {id: this.id})}).subscribe((res: HttpRes) => {
      if (res.code === 200) {
        const value = res.data.results[0][0];
        simpleSetForm(this.formConfig, value);
        this.showForm = true;
      }
    });
  }
  save() {
    const ajaxType = this.op === 'add' ? AJAXTYPE.POST : AJAXTYPE.PUT;
    const params = {...this.form.value, id: this.id};
    this.util.ajax(this.url, {
      ...params,
      ...getSql(this.url.url, ajaxType, params)
    }, ajaxType).subscribe((res: HttpRes) => {
      if (res.code === 200) {
        this.message.success('操作成功');
        this.back();
      } else {
        this.message.error('操作失败');
      }
    });
  }
  back() {
    this.router.navigateByUrl(this.backUrl);
  }

}
