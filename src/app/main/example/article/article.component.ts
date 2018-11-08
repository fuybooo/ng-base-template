import { Component, OnInit } from '@angular/core';
import {UtilService} from '../../../core/utils/util.service';
import {getSql} from '../../../core/utils/util-sql';
import {AJAXTYPE, HttpRes} from '../../../core/common.model';
import {urls} from '../../../core/urls.model';
import {sliceArray} from '../../../core/utils/util-fns';
import {Router} from '@angular/router';
import {ArticleService} from './article.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less']
})
export class ArticleComponent implements OnInit {
  list = [];
  url = urls.article;
  constructor(
    private util: UtilService,
    private router: Router,
    private articleService: ArticleService
  ) { }

  ngOnInit() {
    // this.util.get(this.url, {
    //   ...getSql(this.url.url, AJAXTYPE.GET)
    // }).subscribe((res: HttpRes) => {
    //   if (res.code === 200) {
    //     this.list = sliceArray(res.data.results[0]);
    //   }
    // });
    this.search();
  }
  search() {
    this.articleService.getList();
  }
  add() {
    this.router.navigateByUrl('/main/example/article/info/add');
  }
  viewInfo(info) {
    this.router.navigateByUrl('/main/example/article/info/edit/' + info.id);
  }
}
