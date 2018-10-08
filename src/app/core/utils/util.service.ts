import {Injectable} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {equalDay, isEmptyObject, isHoliday} from './util-fns';
import {
  defaultCommonParams,
  getCommonParams,
  getUrl
} from './util-project';
import {AJAXTYPE, Dictionaries, HttpRes} from '../common.model';
import {debounceTime} from 'rxjs/internal/operators';
import * as eachDay from 'date-fns/each_day';
import * as addDays from 'date-fns/add_days';
import * as isAfter from 'date-fns/is_after';
import {DomSanitizer} from '@angular/platform-browser';
import {UrlConfig} from '../urls.model';

/**'
 * 工具接口
 * ==
 * 实现全局公共的方法
 */
@Injectable()
export class UtilService {
  static dictionaries: Dictionaries = {};
  holidayList = [];
  constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer
    ) {
  }

  /**
   * 获取startDate到endDate之间有多少个工作日
   * @param startDate
   * @param endDate
   * @returns {number}
   */
  getWorkDays(startDate, endDate): number {
    let middleDateList = [];
    if (isAfter(endDate, addDays(startDate, 1))) {
      middleDateList = eachDay(addDays(startDate, 1), endDate);
    }
    if (middleDateList.length) {
      const workDateList = middleDateList.filter(date => {
        const specialDay = this.holidayList.find(item => equalDay(date, item));
        return !isHoliday(date, specialDay);
      });
      return workDateList.length;
    }
    return 0;
  }

  /**
   * 通过传入url，参数，类型调用请求
   * @param url
   * @param {{}} params
   * @param {string} type
   * @returns {Observable<Object>}
   */
  ajax(url, params = {}, type = AJAXTYPE.GET, commonParams = {}) {
    if (type === AJAXTYPE.GET) {
      return this.get(url, params, commonParams);
    } else if (type === AJAXTYPE.POST) {
      return this.post(url, params, commonParams);
    } else if (type === AJAXTYPE.PUT) {
      return this.put(url, params);
    } else if (type === AJAXTYPE.DELETE) {
      return this.delete(url, params);
    }
  }
  /**
   * 通用的get请求
   * @param url
   * @param params
   * @param commonParams 分页参数和排序参数
   * @returns {Observable<Object>}
   */
  get(url: UrlConfig, params: any = {}, commonParams = {}) {
    params.IIP = true;
    const common = isEmptyObject(commonParams) ? {} : {
      ...defaultCommonParams, ...commonParams
    };
    // IIP 表示idInParams id参数是否可以在参数中存在，默认为false，表示id需要拼接在url后面，为true时参数中存在id，url中不存在id
    return this.http.post(getUrl(url, params.IIP ? undefined : params.id), getCommonParams({...params, ...common}));
  }

  /**
   * 通用的post请求
   * @param url
   * @param params
   * @returns {Observable<Object>}
   */
  post(url: UrlConfig, params: any = {}, commonParams = {}) {
    params.IIP = true;
    const common = isEmptyObject(commonParams) ? {} : {
      ...defaultCommonParams, ...commonParams
    };
    return this.http.post(getUrl(url, params.IIP ? undefined : params.id), getCommonParams({...params, ...common}, 'post', url.isLogin));
  }

  /**
   * 通用的put请求
   * @param url
   * @param params
   * @returns {Observable<Object>}
   */
  put(url: UrlConfig, params: any = {}) {
    params.IIP = true;
    return this.http.post(getUrl(url, params.IIP ? undefined : params.id), getCommonParams(params, 'put'));
  }

  /**
   * 通用的delete请求
   * @param url
   * @param params
   * @returns {Observable<Object>}
   */
  delete(url: UrlConfig, params: any = {}) {
    params.IIP = true;
    return this.http.post(getUrl(url, params.IIP ? undefined : params.id), getCommonParams(params, 'delete'));
  }

  getDomSanitizerUrl(url: string) {
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
  }
  getDomSanitizerHtml(html: string) {
    return this.domSanitizer.bypassSecurityTrustHtml(html);
  }


  /**
   * 远程验证表单中的值是否与数据库中的重复
   * @param url
   * @param extend
   * @param field
   * @returns {(control:FormControl)=>any}
   */
  getSyncValidator(url: UrlConfig, extend = {}, field = 'value') {
    return (control: FormControl) => {
      return Observable.create((observer) => {
        this.get(url, {[field]: control.value.trim() || '', ...extend}).pipe(debounceTime(100)).subscribe((res: HttpRes) => {
          if (res.code === 200) {
            if (res.data.isExist) {
              observer.next({error: true, dup: true});
            } else {
              observer.next(null);
            }
          } else {
            observer.next(null);
          }
          observer.complete();
        });
      });
    };
  }

}
