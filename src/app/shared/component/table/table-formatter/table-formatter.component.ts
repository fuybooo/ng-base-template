import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {UtilService} from '../../../../core/utils/util.service';
import {isShowOpBtn} from '../../../../core/utils/util-project';

@Component({
  selector: 'app-table-formatter',
  templateUrl: './table-formatter.component.html',
  styleUrls: ['./table-formatter.component.less'],
})
export class TableFormatterComponent implements OnInit {
  @Input() col;
  @Input() data;
  @Input() type;
  @Input() ev;
  @Input() evi;
  @Input() emitEvent;
  popVisible = false;
  delPopVisible = false;
  popValue = null;
  constructor(private message: NzMessageService, private utilService: UtilService) {}
  ngOnInit() {}
  handlePopoverValueCancel() {
    this.popVisible = false;
    this.delPopVisible = false;
  }
  handlePopoverValueOk(col, data, event) {
    if (event === 'editPop') {
      if (!this.popValue) {
        this.message.error('请填写数据');
        return;
      }
    }
    this.emitEvent(col, data, event, {popValue: this.popValue});
    this.popVisible = false;
    this.delPopVisible = false;
  }
  emit(col, data, event) {
    this.emitEvent(col, data, event);
  }
  getTaskStatus(data) {
    let status = data.status || '1';
    if (!data.status) {
      const diff = Math.floor((Date.now() - (data.begindate || data.createtime)) / (24 * 60 * 60 * 1000));
      if (diff < 4) {
        // 小于4天，绿灯
        status = '1';
      } else if (diff >= 4 && diff <= 7) {
        status = '2';
      } else if (diff > 7) {
        status = '3';
      }
    }
    return status;
  }
  isShowOpBtn(data) {
    return isShowOpBtn(data);
  }
}
