import React, { ReactNode } from 'react';
interface Test {
    name: string;
}
declare class Parent extends React.Component<any> implements Test {
    name: string;
    constructor(props: any);
    render(): ReactNode;
}
export default Parent;
