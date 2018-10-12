import {urls} from '../urls.model';
import {guid} from './util-fns';
import {AJAXTYPE} from '../common.model';
import {Base64} from 'js-base64';

function isEmpty(o) {
  return o === null || o === '' || o === undefined;
}
function getKwStr(fields, params) {
  let sql = '';
  if (!isEmpty(params.kw)) {
    sql = ` and (${fields.map(f => `${f} like '%${params.kw}%'`).join(' or ')})`;
  }
  return sql;
}
function pushUpdateStr(sqls, params, tableName, excludeFields = []) {
  let updateColStr = '';
  for (const p in params) {
    if (!excludeFields.some(f => f === p)) {
      updateColStr += ` ${p} = '${params[p]}',`;
    }
  }
  // 如果不修改权限的名称或者描述的话，不需要执行修改语句
  if (updateColStr) {
    sqls.push(`update ${tableName} set ${updateColStr.slice(0, -1)} where id = '${params.id}'`);
  }
}
function pushDeleteStr(sqls, params, tableName) {
  sqls.push(
    `delete from ${tableName} where id in (${params.idList.map(id => `'${id}'`).join()})`,
  );
}
// 获取特殊条件
function getSpecialStr(params) {
  let sql = '';
  // 只查在permission-user表中不存在的user
  if (params.special === 'permission-user') {
    sql = ' and id not in (select userid from t_permission_user)';
  }
  return sql;
}
function getLimitStr(params) {
  let sql = '';
  if (params.pageSize && params.pageNumber) {
    sql = ` limit ${params.pageSize * (params.pageNumber - 1)}, ${params.pageSize}`;
  }
  return sql;
}
function pushCount(sqls, params, tableName) {
  // 是否需要查询总数，默认只要传了分页参数都是需要查询总数的，否则不查总数
  if (params.pageSize && params.pageNumber && !params.needNotTotal) {
    sqls.push(`select count(*) as t from ${tableName}`);
  }
}
/**
 * 生成sql语句
 * 本项目主要是做前端的展示，后端数据只通过简单的sql进行操作，暂时不考虑易用性，安全性等。
 * @param url
 * @param type
 * @param params
 */
export function getSql(url: string, type, params?) {
  const sqls = [];
  let sql = '';
  switch (url) {
    case urls.login.url:
      sqls.push(`select id, loginname, name from t_user where loginname = '${params.loginname}' and pwd = '${Base64.encode(`${params.loginname}${params.password}`)}'`);
      break;
    case urls.menu.url:
      sqls.push(`select * from t_menu`);
      break;
    case urls.permission.url:
      switch (type) {
        case AJAXTYPE.PUT:
          pushUpdateStr(sqls, params, 't_permission', ['menuList', 'id']);
          if (params.menuList.add.length) {
            params.menuList.add.forEach(item => {
              sqls.push(`insert into t_permission_menu values ('${guid()}', '${params.id}', '${item.id}', ${item.isHalf ? 1 : 0})`);
            });
          }
          if (params.menuList.del.length) {
            params.menuList.del.forEach(item => {
              sqls.push(`delete from t_permission_menu where permissionid = '${params.id}' and menuid = '${item.id}'`);
            });
          }
          break;
        case AJAXTYPE.POST:
          const permissionId = guid();
          sql = `insert into t_permission values ('${permissionId}', '${params.name}', '${params.description}')`;
          sqls.push(sql);
          // 逐条插入
          params.menuList.add.forEach(item => {
            sqls.push(`insert into t_permission_menu values ('${guid()}', '${permissionId}', '${item.id}', ${item.isHalf ? 1 : 0})`);
          });
          break;
        case AJAXTYPE.GET:
          if (params.id) {
            sqls.push(`select * from t_permission where id = '${params.id}'`);
            sqls.push(`select pm.menuid as id, pm.ishalf from t_menu m left join t_permission_menu pm on m.id = pm.menuid where permissionid = '${params.id}'`);
          } else {
            sql = `select * from t_permission where 1 = 1`;
            sql += getKwStr(['name', 'description'], params);
            if (params.sortField) {
              sql += ` order by ${params.sortField} ${params.sortOrder || 'asc'}`;
            } else {
              sql += ` order by name asc`;
            }
            sql += getLimitStr(params);
            sqls.push(sql);
            pushCount(sqls, params, 't_permission');
          }
          break;
        case AJAXTYPE.DELETE:
          const idStr = params.idList.map(id => `'${id}'`).join();
          sqls.push(
            `delete from t_permission where id in (${idStr})`,
            `delete from t_permission_menu where permissionid in (${idStr})`
          );
          break;
      }
      break;
    case urls.permissionUser.url:
      switch (type) {
        case AJAXTYPE.GET:
          if (params.id) {
            sqls.push(`select * from t_permission_user where id = '${params.id}'`);
          } else {
            sql = `select pu.id, u.name as username, u.loginname, p.name as permission, p.description from t_permission_user pu left join t_permission p on p.id = pu.permissionid left join t_user u on u.id = pu.userid where 1 = 1`;
            sql += getKwStr(['u.name', 'u.loginname', 'p.name', 'p.description'], params);
            if (params.sortField) {
              let sortField = '';
              if (params.sortField === 'username') {
                sortField = `u.name`;
              } else if (params.sortField === 'loginname') {
                sortField = `u.loginname`;
              } else if (params.sortField === 'permission') {
                sortField = `p.name`;
              } else if (params.sortField === 'description') {
                sortField = `p.description`;
              }
              sql += ` order by ${sortField} ${params.sortOrder || 'asc'}`;
            } else {
              sql += ` order by u.name asc`;
            }
            sql += getLimitStr(params);
            sqls.push(sql);
            pushCount(sqls, params, 't_permission_user');
          }
          break;
        case AJAXTYPE.POST:
          sqls.push(`insert into t_permission_user values ('${guid()}', '${params.permissionid}', '${params.userid}')`);
          break;
        case AJAXTYPE.PUT:
          pushUpdateStr(sqls, params, 't_permission_user', ['userid', 'id']);
          break;
        case AJAXTYPE.DELETE:
          pushDeleteStr(sqls, params, 't_permission_user');
          break;
      }
      break;
    case urls.user.url:
      switch (type) {
        case AJAXTYPE.GET:
          if (params.id) {
            sqls.push(`select * from t_user where id = '${params.id}'`);
          } else if (params.permissionid) {
            sqls.push(`select * from t_user u where u.id = (select pu.userid from t_permission_user pu where pu.id = '${params.permissionid}')`);
          } else {
            sql = `select * from t_user where 1 = 1`;
            sql += getKwStr(['name', 'loginname'], params);
            // 增加特殊条件
            sql += getSpecialStr(params);
            if (params.sortField) {
              sql += ` order by ${params.sortField} ${params.sortOrder || 'asc'}`;
            } else {
              sql += ` order by name asc`;
            }
            sql += getLimitStr(params);
            sqls.push(sql);
            pushCount(sqls, params, 't_user');
          }
          break;
        case AJAXTYPE.POST:
          sqls.push(`insert into t_user values('${guid()}', '${params.name}', '${Base64.encode(`${params.loginname}123456`)}', '${params.loginname}')`);
          break;
        case AJAXTYPE.PUT:
          pushUpdateStr(sqls, params, 't_user');
          break;
        case AJAXTYPE.DELETE:
          pushDeleteStr(sqls, params, 't_user');
          break;
      }
      break;
    case urls.userMenu.url:
      switch (type) {
        case AJAXTYPE.GET:
          sqls.push(`select m.* from t_menu m where m.id in (select pm.menuid from t_permission_menu pm where pm.permissionid = (select pu.permissionid from t_permission_user pu where pu.userid = '${params.userid}'))`);
          break;
      }
      break;
  }
  console.log('打印sqls', sqls);
  return {sqls};
}
