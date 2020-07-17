import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import '@style/index';


const ButtonBase = () => {
    const array: string[] = Array.from<string>({length: 3}).fill("string");
    return (
        <div>
            {
                React.Children.map(array, (item, index)=>{
                    return <span key={index}>{item} - {index}</span>
                })
            }
        </div>
    );
};


ReactDOM.render(<ButtonBase />, document.getElementById('app'));

