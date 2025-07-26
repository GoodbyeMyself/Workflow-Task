import React from 'react';
// umi
import { Outlet } from 'umi';
// 组件
import Nav from './Nav';

// 初始主题
import { ThemeProvider } from 'next-themes';

const Layout: React.FC = () => {


    return (
        <ThemeProvider
            attribute="data-theme"
            defaultTheme="light"
            enableSystem={true}
            disableTransitionOnChange={false}
        >
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
        </ThemeProvider>
    );
};

export default Layout;
