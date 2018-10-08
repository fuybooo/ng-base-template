export interface UrlConfig {
  url: string;
  isStatic?: boolean;
  isLogin?: boolean;
}
interface CommonUrl {
  login: UrlConfig;
  permission: UrlConfig;
  menu: UrlConfig;
}
/**
 * 请求URL
 */
export const urls: CommonUrl = {
  login: {
    url: '/login',
    isStatic: true,
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
};
