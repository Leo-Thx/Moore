import * as React from 'react';
import { SubMenuProps } from './Menu.type';
import classnames from 'classnames';
import { clsPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';

const subMenuPrefix  = 'sub-menu';

export default class SubMenu extends React.Component<SubMenuProps> {
    static displayName = `${clsPrefix}-SubMenu`;
    static defaultProps = {};

    constructor(props: SubMenuProps){
        super(props);
    }

    render() {
        let clsPrefix = getClsPrefix(subMenuPrefix),
            clsName = classnames(clsPrefix);

        return (
            <ul className={clsName}>MenuItem</ul>
        );
    }
}