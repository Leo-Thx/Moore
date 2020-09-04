import * as React from 'react';
import { MenuItemProps } from './Menu.type';
import classnames from 'classnames';
import { clsPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';

const menuItemPrefix  = 'menu-item';

export default class MenuItem extends React.Component<MenuItemProps> {
    static displayName = `${clsPrefix}-MenuItem`;
    static defaultProps = {};

    constructor(props: MenuItemProps){
        super(props);
    }

    render() {
        let clsPrefix = getClsPrefix(menuItemPrefix),
            clsName = classnames(clsPrefix);

        return (
            <li className={clsName}>MenuItem</li>
        );
    }
}