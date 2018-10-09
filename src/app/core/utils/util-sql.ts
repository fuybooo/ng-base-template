import {urls} from '../urls.model';
import {guid} from './util-fns';
import {AJAXTYPE} from '../common.model';

function isEmpty(o) {
  return o === null || o === '' || o === undefined;
}
function getKwStr(fields, kw) {
  return fields.map(f => `${f} like '%${kw}%'`).join(' or ');
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
    case urls.menu.url:
      sqls.push(`select * from t_menu`);
      break;
    case urls.permission.url:
      switch (type) {
        case AJAXTYPE.PUT:
          let updateColStr = '';
          for (const p in params) {
            if (p !== 'menuList' && p !== 'id') {
              updateColStr += ` ${p} = '${params[p]}',`;
            }
          }
          // 如果不修改权限的名称或者描述的话，不需要执行修改语句
          if (updateColStr) {
            sql = `update t_permission set ${updateColStr.slice(0, -1)} where id = '${params.id}'`;
            sqls.push(sql);
          }
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
            sql = `select * from t_permission where id = '${params.id}'`;
            sqls.push(sql);
            sqls.push(`select pm.menuid as id, pm.ishalf from t_menu m left join t_permission_menu pm on m.id = pm.menuid where permissionid = '${params.id}'`);
          } else {
            sql = `select * from t_permission where 1 = 1`;
            if (!isEmpty(params.kw)) {
              sql += ` and ${getKwStr(['name', 'description'], params.kw)}`;
            }
            if (params.sortField) {
              sql += ` order by ${params.sortField} ${params.sortOrder || 'asc'}`;
            } else {
              sql += ` order by name asc`;
            }
            if (params.pageSize && params.pageNumber) {
              sql += ` limit ${params.pageSize * (params.pageNumber - 1)}, ${params.pageSize}`;
            }
            sqls.push(sql);
            if (params.pageSize && params.pageNumber) {
              sqls.push(`select count(*) as t from t_permission`);
            }
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
          } else {
            sql = `select u.name as username, u.loginname, p.name as permission, p.description from t_permission_user pu left join t_permission p on p.id = pu.permissionid left join t_user u on u.id = pu.userid where 1 = 1`;
            if (!isEmpty(params.kw)) {
              sql += ` and ${getKwStr(['u.name', 'u.loginname', 'p.name', 'p.description'], params.kw)}`;
            }
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
            if (params.pageSize && params.pageNumber) {
              sql += ` limit ${params.pageSize * (params.pageNumber - 1)}, ${params.pageSize}`;
            }
            sqls.push(sql);
            if (params.pageSize && params.pageNumber) {
              sqls.push(`select count(*) as t from t_permission_user`);
            }
          }
          break;
      }
      break;
    case urls.user.url:
      switch (type) {
        case AJAXTYPE.GET:
          if (params.id) {
          } else {
            sql = `select * from t_user where 1 = 1`;
            if (!isEmpty(params.kw)) {
              sql += ` and name like '%${params.kw}%'`;
            }
            if (params.sortField) {
              sql += ` order by ${params.sortField} ${params.sortOrder || 'asc'}`;
            } else {
              sql += ` order by name asc`;
            }
            if (params.pageSize && params.pageNumber) {
              sql += ` limit ${params.pageSize * (params.pageNumber - 1)}, ${params.pageSize}`;
            }
            sqls.push(sql);
            if (params.pageSize && params.pageNumber) {
              sqls.push(`select count(*) as t from t_user`);
            }
          }
          break;
      }
      break;
  }
  console.log('打印sqls', sqls);
  return {sqls};
}
