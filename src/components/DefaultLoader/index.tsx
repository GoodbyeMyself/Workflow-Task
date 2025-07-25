import { Spin } from 'antd';

export default function (loading: boolean) {
    return loading ? (
        <div
            style={{
                height: '320px',
                lineHeight: '320px',
                textAlign: 'center',
                backgroundColor: '#fff',
            }}
        >
            <Spin spinning={loading} />
        </div>
    ) : null;
}
