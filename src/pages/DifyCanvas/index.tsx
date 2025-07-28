import React from 'react';

import {
    history,
} from '@umijs/max';

const DifyCanvas: React.FC = () => {

    const router = history;

    console.log(router, '<- 打印 xxx');

    return (
        <div>
           DifyCanvas
        </div>
    );
};

export default DifyCanvas;
