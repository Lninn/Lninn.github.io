import useRoutesStore from '#/store/routes'
import useThemeStore from '#/store/theme'
import { setupGlobalErrorHandlers } from './setupErrorHandlers'

// 应用初始化状态
export const appInitState = {
  startTime: performance.now(),
  isComplete: false,
  progress: 0,
  error: null,
  initTasks: {
    routes: { completed: false, error: null },
    theme: { completed: false, error: null },
    errorHandlers: { completed: false, error: null }
  }
};

// 更新初始化进度
const updateProgress = () => {
  const tasks = appInitState.initTasks;
  const totalTasks = Object.keys(tasks).length;
  const completedTasks = Object.values(tasks).filter(task => task.completed).length;
  
  appInitState.progress = Math.floor((completedTasks / totalTasks) * 100);
  
  if (completedTasks === totalTasks) {
    appInitState.isComplete = true;
    appInitState.loadTime = performance.now() - appInitState.startTime;
    console.log(`应用初始化完成，耗时: ${appInitState.loadTime.toFixed(2)}ms`);
  }
};

// 标记任务完成
const markTaskComplete = (taskName, error = null) => {
  appInitState.initTasks[taskName].completed = true;
  appInitState.initTasks[taskName].error = error;
  
  if (error) {
    console.error(`初始化任务 ${taskName} 失败:`, error);
    appInitState.error = appInitState.error || error;
  }
  
  updateProgress();
};

// 初始化路由
const initRoutes = async () => {
  try {
    await useRoutesStore.getState().initRoutes();

    markTaskComplete('routes');
  } catch (error) {
    markTaskComplete('routes', error);
  }
};

// 初始化主题
const initTheme = () => {
  try {
    useThemeStore.getState().initTheme();
    markTaskComplete('theme');
  } catch (error) {
    markTaskComplete('theme', error);
  }
};

// 初始化错误处理
const initErrorHandlers = () => {
  try {
    setupGlobalErrorHandlers();
    markTaskComplete('errorHandlers');
  } catch (error) {
    markTaskComplete('errorHandlers', error);
  }
};

// 初始化应用
export const initializeApp = async () => {
  // 并行执行初始化任务
  await Promise.all([
    initRoutes(),
    Promise.resolve(initTheme()),
    Promise.resolve(initErrorHandlers())
  ]);
  
  return appInitState;
};
