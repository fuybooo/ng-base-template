import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {guid} from '../../../../core/utils/util-fns';
import {FormConfigItem} from '../../../../shared/component/form/form.model';
import {FormGroup} from '@angular/forms';
import {UtilService} from '../../../../core/utils/util.service';
import {urls} from '../../../../core/urls.model';
import {getSql} from '../../../../core/utils/util-sql';
import {AJAXTYPE, HttpRes} from '../../../../core/common.model';

@Component({
  selector: 'app-article-info',
  templateUrl: './article-info.component.html',
  styleUrls: ['./article-info.component.less']
})
export class ArticleInfoComponent implements OnInit {
  op;
  id;
  url = urls.article;
  titleText;
  formId = guid();
  form = new FormGroup({});
  formConfig: FormConfigItem[][] = [
    [
      {
        field: 'title',
        label: '标题'
      },
    ],
    [
      {
        type: 'commonSelect',
        field: 'type',
        label: '类型',
        isNotServerSearch: true,
        optionLabel: 'name',
        list: [
          {
            id: '1',
            name: '参考资料'
          },
          {
            id: '2',
            name: '值得学习'
          }
        ]
      },
    ],
    [
      {
        field: 'url',
        label: 'URL',
        placeholder: '与内容二选一'
      }
    ],
    [
      {
        type: 'editor',
        field: 'content',
        label: '内容'
      }
    ],
  ];
  data;
  constructor(
    private route: ActivatedRoute,
    private util: UtilService
    ) { }

  ngOnInit() {
    this.op = this.route.snapshot.params.op;
    this.id = this.route.snapshot.params.id;
    this.titleText = '新增文章';
    if (this.op === 'edit') {
      this.titleText = '编辑文章';
      this.searchInfoDetail();
    } else if (this.op === 'view') {
      this.titleText = '查看';
    }
  }
  searchInfoDetail() {
    const params = {};
    this.util.get(this.url, {
      ...params,
      ...getSql(this.url.url, AJAXTYPE.GET, params)
    }).subscribe((res: HttpRes) => {
      if (res.code === 200) {
        this.data = res.data.results[0][0];
        console.log(this.data);
      }
    });
  }
  handleForm() {
    console.log(this.form.value);
  }

}
