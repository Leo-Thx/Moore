import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
// import './style/index';

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
        return (<div className="test">{this.name}d112</div>) as ReactNode;
    }
}

ReactDOM.render(<Parent></Parent>, document.getElementById('app'));

