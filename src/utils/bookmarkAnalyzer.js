/**
 * 书签网站分析工具
 * 用于从URL获取网站元数据，如标题、图标和推荐分类
 */

/**
 * 获取网站元数据
 * @param {string} url - 要分析的网站URL
 * @returns {Promise<Object>} 包含网站标题、图标和推荐分类的对象
 */
export const fetchWebsiteMetadata = async (url) => {
  try {
    // 使用 cors-anywhere 代理服务来解决 CORS 问题
    const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(url);
    const response = await fetch(proxyUrl);
    const data = await response.json();
    
    if (!data.contents) {
      throw new Error('无法获取网站内容');
    }

    // 创建一个 DOM 解析器
    const parser = new DOMParser();
    const doc = parser.parseFromString(data.contents, 'text/html');
    
    // 获取网站标题
    let title = doc.querySelector('title')?.textContent || '';
    if (!title) {
      // 尝试获取 og:title
      title = doc.querySelector('meta[property="og:title"]')?.getAttribute('content') || '';
    }
    
    // 获取网站图标
    let icon = '';
    // 首先尝试获取 favicon
    const favicon = doc.querySelector('link[rel="icon"]') || 
                   doc.querySelector('link[rel="shortcut icon"]');
    if (favicon) {
      icon = new URL(favicon.getAttribute('href'), url).href;
    }
    
    // 如果没有找到 favicon，使用 Google Favicon 服务作为备选
    if (!icon) {
      icon = `https://www.google.com/s2/favicons?domain=${url}`;
    }

    // 尝试从 meta 标签获取关键词来辅助分类
    let keywords = doc.querySelector('meta[name="keywords"]')?.getAttribute('content') || '';
    let description = doc.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    
    // 根据关键词和描述推测分类
    let suggestedCategory = guessCategoryFromContent(keywords + ' ' + description) || 
                           guessCategory(new URL(url).hostname);

    return {
      title: title || getDefaultTitle(url),
      icon,
      suggestedCategory
    };
  } catch (error) {
    console.error('获取网站信息失败:', error);
    return getFallbackMetadata(url);
  }
};

/**
 * 从网站内容推测分类
 * @param {string} content - 网站内容文本
 * @returns {string|null} 推测的分类或null
 */
const guessCategoryFromContent = (content = '') => {
  const contentLower = content.toLowerCase();
  const categoryPatterns = {
    '技术': ['programming', 'developer', 'coding', '编程', '开发', '技术'],
    '新闻': ['news', 'daily', 'report', '新闻', '资讯'],
    '购物': ['shop', 'store', 'buy', 'price', '商城', '购物'],
    '教育': ['learn', 'course', 'education', 'study', '教育', '学习'],
    '娱乐': ['game', 'entertainment', 'movie', 'music', '游戏', '电影', '音乐'],
    '社交': ['social', 'community', 'forum', '社区', '论坛']
  };

  for (const [category, patterns] of Object.entries(categoryPatterns)) {
    if (patterns.some(pattern => contentLower.includes(pattern))) {
      return category;
    }
  }
  return null;
};

/**
 * 获取默认标题
 * @param {string} url - 网站URL
 * @returns {string} 从URL生成的默认标题
 */
const getDefaultTitle = (url) => {
  try {
    const domain = new URL(url).hostname;
    return domain.split('.')[0].charAt(0).toUpperCase() + 
           domain.split('.')[0].slice(1);
  } catch {
    return url;
  }
};

/**
 * 当所有方法都失败时的备选方案
 * @param {string} url - 网站URL
 * @returns {Object} 包含默认元数据的对象
 */
const getFallbackMetadata = (url) => {
  try {
    const domain = new URL(url).hostname;
    return {
      title: getDefaultTitle(url),
      icon: `https://www.google.com/s2/favicons?domain=${url}`,
      suggestedCategory: guessCategory(domain)
    };
  } catch {
    throw new Error('无效的URL格式');
  }
};

/**
 * 根据域名猜测分类
 * @param {string} domain - 网站域名
 * @returns {string} 推测的分类
 */
const guessCategory = (domain) => {
  const categories = {
    'github': '开发工具',
    'stackoverflow': '开发工具',
    'youtube': '视频',
    'bilibili': '视频',
    'google': '搜索',
    'baidu': '搜索',
    'zhihu': '社交',
    'weibo': '社交',
    'twitter': '社交',
    'facebook': '社交',
    'instagram': '社交',
    'amazon': '购物',
    'taobao': '购物',
    'jd': '购物'
  }
  
  for (const [key, value] of Object.entries(categories)) {
    if (domain.includes(key)) {
      return value
    }
  }
  
  return '其他'
}

/**
 * 检查URL是否已存在于书签列表中
 * @param {string} url - 要检查的URL
 * @param {Array} bookmarkList - 书签列表
 * @returns {boolean} 是否存在
 */
export const checkUrlExists = (url, bookmarkList) => {
  const normalizedUrl = url.toLowerCase().replace(/\/$/, '')
  return bookmarkList.some(bookmark => 
    bookmark.url.toLowerCase().replace(/\/$/, '') === normalizedUrl
  )
}