import * as React from 'react';
import { MenuGroupProps } from './Menu.type';
import classnames from 'classnames';
import { clsPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';


const menuGroupPrefix  = 'menu-group';
export default class MenuGroup extends React.Component<MenuGroupProps> {
    static displayName = `${clsPrefix}-MenuGroup`;
    static defaultProps = {};

    constructor(props: MenuGroupProps){
        super(props);
    }

    render() {
        let clsPrefix = getClsPrefix(menuGroupPrefix),
            clsName = classnames(clsPrefix);

        return (
            <li className={clsName}>MenuItem</li>
        );
    }
}