// 运行时 配置
import type { RunTimeLayoutConfig } from '@umijs/max';

// 微前端
import { apps } from '../config/qiankun';

// 导入错误过滤器
import { enableErrorFilter } from './utils/enhancedErrorFilter';

// 启用错误过滤器
enableErrorFilter();

interface AppProps {
    name?: string;
}

export const qiankun = {
    // 应用列表
    apps,
    // 应用 加载 之前
    async bootstrap(props: AppProps) {
        if (props) {
            console.log(props, '微应用： 加载前');
        }
    },
    // 应用 render 之前触发
    async mount(props: AppProps) {
        console.log(props, '微应用： 挂载成功');
    },
    // 应用 卸载 之后触发
    async unmount(props: AppProps) {
        console.log(props, '微应用： 卸载成功');
    },
};

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
    // 是否做为 子应用 被挂载
    isMicroApp?: boolean;
}> {
    return {
        // 是否做为 子应用 被挂载
        isMicroApp: (window as any).__POWERED_BY_QIANKUN__ ? true : false,
    };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
    // 从初始状态里面获取数据
    const { isMicroApp } = initialState || {};

    // 设置 主题
    document.documentElement.setAttribute('data-theme', 'light');

    return {
        /**
         * @description: 做为 子应用时 放弃基础 pro-layout
         * @author: M.yunlong
         * @date: 2024-04-05 00:20:17
         */
        pure: isMicroApp,
        // --
        logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
        menu: {
            locale: false,
        },
        // 菜单 顶部
        layout: 'top',
        // 自定义 页面 title
        pageTitleRender: () => {
            return 'Dify 任务编排';
        },
    };
};
