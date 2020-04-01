// sessionStorage保存当前登录用户信息
export const CURRENT_USER_INFO = 'CURRENT_USER_INFO';

export const OPEN_NEW_PAGE_PARAMS = 'OPEN_NEW_PAGE_PARAMS';

export const PERMISSION = 'PERMISSION';

// 公共的api前缀
export const PROXY_API = '/api';

// 返回编辑页
export const CURRENT_MENU_EDITE = 'CURRENT_MENU_EDITE';

// 分页条数组
export const PAGE_SIZE_OPTIONS = ['10', '20', '30'];

// 默认分页条数
export const PAGE_SIZE = parseInt(PAGE_SIZE_OPTIONS[0], 10);

export const formatTimeReg = new RegExp('/', 'g');

// 日期+时间格式
export const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const TIME_FORMAT = {
    day: 'YYYY-MM-DD',
    week: 'YYYY-MM-DD',
    month: 'YYYY-MM',
    year: 'YYYY'
};

// echarts 地图省份名称
export const PROVINCES = [
    '北京',
    '天津',
    '上海',
    '重庆',
    '河北',
    '河南',
    '云南',
    '辽宁',
    '黑龙江',
    '湖南',
    '安徽',
    '山东',
    '新疆',
    '江苏',
    '浙江',
    '江西',
    '湖北',
    '广西',
    '甘肃',
    '山西',
    '内蒙古',
    '陕西',
    '吉林',
    '福建',
    '贵州',
    '广东',
    '青海',
    '西藏',
    '四川',
    '宁夏',
    '海南',
    '台湾',
    '香港',
    '澳门',
    '南海诸岛'
];

// 分数排序 [降序，升序]
export const SCORE_SORTS = {
    FRAUD: [1, 2],
    RISK: [3, 4]
};

// 时间节点分类
export const TIME_NODE = [
    {name: '天', value: 1},
    {name: '周', value: 2},
    {name: '月', value: 3},
    {name: '季度', value: 4},
    {name: '半年', value: 5},
    {name: '年', value: 6}
];
