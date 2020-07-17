// import "core-js/stable";
// import "regenerator-runtime/runtime";

import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './style/index';

interface Test {
    name:  string;
}

class Parent extends React.Component<any> implements Test {
    public name: string;
    public constructor(props?: any) {
        super(props);
        this.name = Parent.name;
    }
    public render() : ReactNode {
        const array: string[] = Array.from<string>({length: 3}).fill("string");
        return (<div className="test">{array.length}</div>) as ReactNode;
    }
}

ReactDOM.render(<Parent></Parent>, document.getElementById('app'));