export interface UrlConfig {
  url: string;
  isStatic?: boolean;
  isLogin?: boolean;
}
interface CommonUrl {
  login: UrlConfig;
  permission: UrlConfig;
  menu: UrlConfig;
  permissionUser: UrlConfig;
  user: UrlConfig;
  userMenu: UrlConfig;
  article: UrlConfig;
}
/**
 * 请求URL
 */
export const urls: CommonUrl = {
  login: {
    url: '/login',
    isStatic: false,
    isLogin: true
  },
  permission: {
    url: '/permission',
    isStatic: false
  },
  menu: {
    url: '/menu',
    isStatic: false
  },
  permissionUser: {
    url: '/permissionUser',
    isStatic: false
  },
  user: {
    url: '/user',
    isStatic: false
  },
  userMenu: {
    url: '/userMenu',
    isStatic: false
  },
  article: {
    url: '/article',
    isStatic: false
  },
};
