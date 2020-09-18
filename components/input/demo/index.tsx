import React from 'react';
import Input from './../input';

export default function Demo() {
    const onChange = (value:string|number) => {
        console.info(value);
    }

    return (
        <div style={{display: 'flex', flexWrap:'wrap'}}>
            <Input type="text" placeholder="input-sm" size="sm" defaultValue="readonly" readOnly></Input>
            <Input type="text" placeholder="input-default"></Input>
            <Input type="text" placeholder="input-lg" size="lg"></Input>
            <Input type="text" placeholder="可清空" clearable onChange={onChange}></Input>

            <Input type="text" placeholder="添加Prefix标签" size="sm" prefix="check-circle-fill"></Input>
            <Input type="text" placeholder="添加Suffix标签" size="sm" suffix="自定义"></Input>
            <Input type="text" placeholder="自定义前置" size="sm" prefix="Http://"></Input>
            <Input type="text" placeholder="添加Suffix标签" size="sm" suffix="warning-circle-fill" clearable prefix="Http://"></Input>

            <Input type="text" placeholder="添加Prefix标签" prefix="check-circle-fill"></Input>
            <Input type="text" placeholder="添加Suffix标签" suffix="自定义"></Input>
            <Input type="text" placeholder="自定义前置" prefix="Http://"></Input>
            <Input type="text" placeholder="添加Suffix标签" suffix="warning-circle-fill" clearable prefix="Http://"></Input>

            <Input type="text" placeholder="添加Prefix标签" size="lg" prefix="check-circle-fill"></Input>
            <Input type="text" placeholder="添加Suffix标签" size="lg" suffix="自定义"></Input>
            <Input type="text" placeholder="自定义前置" size="lg" prefix="Http://"></Input>
            <Input type="text" placeholder="添加Suffix标签" size="lg" suffix="warning-circle-fill" clearable prefix="Http://"></Input>
        </div>
    )
}
