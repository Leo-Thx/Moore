import React from 'react';

export type CompProps = {

};

const CompnentName: React.FC<CompProps> = (props: CompProps) => {
    return (
        <div>{CompnentName.name}</div>
    )
};

export default CompnentName;