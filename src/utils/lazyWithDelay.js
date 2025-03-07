import { lazy } from 'react';

export const lazyWithDelay = (factory, minDelay = 500) => {
  return lazy(() => {
    return Promise.all([
      factory(),
      new Promise(resolve => setTimeout(resolve, minDelay))
    ]).then(([moduleExports]) => moduleExports);
  });
};

// import { lazyWithDelay } from '#/utils/lazyWithDelay';

// // 使用延迟加载
// const DashboardPage = lazyWithDelay(() => import('#/pages/Dashboard'), 500);
// const ArticlePage = lazyWithDelay(() => import('#/pages/Article'), 500);
