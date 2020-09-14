import React from 'react';
import Alert from './../alert';

export default function AlertDemo() {
    return (
        <div>
            <Alert type="info" title="纯文字" closeable/>
            <Alert showIcon type="info" title="纯文字" />
            <Alert showIcon type="success" title="纯文字" closeable onClose={e=>console.info(e)}/>
            <Alert showIcon type="warning" title="纯文字" />
            <Alert showIcon type="error" title="纯文字" />
            <br />

            <Alert showIcon type="warning" title="这是标题" desc="纯文字" />
            <Alert showIcon type="success" closeable desc="纯文字纯文字纯文字纯文字纯文字纯文字纯文字纯文字纯文字纯文字纯文字纯文字纯文字纯文字" />
            <Alert showIcon desc="DIV包裹的文字DIV包裹的文字DIV包裹的文字DIV包裹的文字DIV包裹的文字DIV包裹的文字DIV包裹的文字DIV包裹的文字DIV包裹的文字DIV包裹的文字DIV包裹的文字" 
                title="这是Title这是Title这是Title这是Title这是Title这是Title这是Title这是Title这是Title这是Title这是Title" closeable closeText="关闭" />
            <Alert title="这是Title" type="error" closeable showIcon closeText="关闭" desc="DIV包裹的文字" />
        </div>
    )
}

