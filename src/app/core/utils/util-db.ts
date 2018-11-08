import Dexie from 'dexie';

export function createDatabase() {
  const db: any = new Dexie('fuybooo');
  db.version(1).stores({
    users: '++id, name, email',
    orgs: '++id, name, *code'
  });
  db.transaction('rw', db.users, db.orgs, function* () {
    const userId_1 = yield db.users.
      add({
      name: 'fuybooo',
      email: 'fuybooo@qq.com'
    });
    const userId_2 = yield db.users.
      add({
      name: 'zhangdp',
      email: 'zhangdp.qq.com'
    });
    const orgId = yield db.orgs.
      add({
      name: '机构一',
      code: 'JG001'
    });
    const users = yield db.users.where('name').equals('zhangdp').toArray();
    console.log(users);
    const orgs = yield db.orgs.where('name').startsWithIgnoreCase('机构').toArray();
    console.log(orgs);
  });
}
