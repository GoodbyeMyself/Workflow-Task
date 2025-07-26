import React from 'react';
// umi
import { Outlet } from 'umi';

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
            <div>
                <Outlet />
            </div>
        </ThemeProvider>
    );
};

export default Layout;
