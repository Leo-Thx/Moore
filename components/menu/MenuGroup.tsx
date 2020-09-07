import * as React from 'react';
import { MenuGroupProps } from './Menu.type';
import classnames from 'classnames';
import { clsPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';


const menuGroupPrefix  = 'menu-group';
const MenuGroup: React.FunctionComponent<MenuGroupProps> = props => {
    let clsPrefix = getClsPrefix(menuGroupPrefix),
        clsName = classnames(clsPrefix);

    return (
        <li className={clsName}>MenuItem</li>
    );
}

MenuGroup.displayName = `${clsPrefix}-MenuGroup`;
MenuGroup.defaultProps = {};

export default MenuGroup;