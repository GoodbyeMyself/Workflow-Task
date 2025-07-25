import React from 'react';
// umi
import { Outlet } from 'umi';
// 组件
import Nav from './Nav';

const Layout: React.FC = () => {
    return (
        <div
            style={{
                minHeight: '600px',
            }}
        >
            {/* 菜单 */}
            {(window as any).__POWERED_BY_QIANKUN__ && <Nav />}
            {/* 容器 */}
            <Outlet />
        </div>
    );
};

export default Layout;
