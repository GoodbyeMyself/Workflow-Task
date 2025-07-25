// react
import React from 'react';
// antd
import { Spin } from 'antd';

const LoadingPage: React.FC = () => {
    return (
        <div
            style={{
                height: '320px',
                lineHeight: '320px',
                textAlign: 'center',
                backgroundColor: '#fff',
            }}
        >
            <Spin spinning={true} />
        </div>
    );
};

export default LoadingPage;
