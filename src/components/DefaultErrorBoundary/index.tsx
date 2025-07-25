/**
 * @description: 子应用使用统一的自定义错误捕获组件
 * @author: M.yunlong
 * @date: 2024-04-06 17:59:15
 */
// antd
import { Result } from 'antd';

export default function (error: Error) {
    console.log(error, 'microappError');

    return (
        <div
            style={{
                backgroundColor: '#fff',
                padding: '24px',
            }}
        >
            <Result
                status="500"
                title="500"
                subTitle="Sorry, something went wrong, 子应用加载异常~"
            />
        </div>
    );
}
