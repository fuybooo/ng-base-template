import {Component, Input, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-import-file',
  templateUrl: './import-file.component.html',
  styleUrls: ['./import-file.component.less']
})
export class ImportFileComponent implements OnInit {
  @Input() downloadUrl;
  @Input() suffixList = ['xls'];
  file;
  fileName = '';
  constructor(
    private message: NzMessageService
  ) { }

  ngOnInit() {
  }
  fileChange(file) {
    // 判断文件的大小，后缀
    if (this.isValidFile(file)) {
      this.file = file.files[0];
      this.fileName = this.file.name;
    } else {
      this.file = null;
      this.fileName = '';
    }
  }
  isValidFile(file) {
    if (file && file.files[0]) {
      const fileName = file.files[0].name;
      const suffix = fileName.slice(fileName.indexOf('.') + 1);
      if (suffix) {
        if (!this.suffixList.some(item => item === suffix)) {
          this.message.error('请选择正确的文件类型');
          return false;
        } else {
          return true;
        }
      }
    }
    return false;
  }
  downTemplate() {
    // window.location.href = this.downloadUrl;
  }
}
