import React, { useState, useRef } from 'react';
// antd
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
// 跳转
import { useNavigate } from 'umi';

const items: MenuProps['items'] = [
    {
        key: 'home',
        label: '首页',
    },
    {
        key: 'difyCanvas',
        label: 'Dify Canvas',
    }
];

const Nav: React.FC = () => {
    const [current, setCurrent] = useState('home');
    const menuRef = useRef<HTMLDivElement>(null);

    const navigate = useNavigate();

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);

        setCurrent(e.key);

        navigate(e.key, { replace: true });
    };

    return (
        <div ref={menuRef}>
            <Menu
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
            />
        </div>
    );
};

export default Nav;
