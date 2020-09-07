import * as React from 'react';
import { MenuItemProps } from './Menu.type';
import classnames from 'classnames';
import { displayPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';
import MenuContext, { MenuContextProps } from './MenuContext';

const menuItemPrefix  = 'menu-item';
const MenuItem: React.FunctionComponent<MenuItemProps> = props => {

    let clsPrefix = getClsPrefix(menuItemPrefix),
        clsName = classnames(clsPrefix),
        { className, index, disabled } = props;

    
    let context = React.useContext(MenuContext),
        { activeMenu } = context;

    const handleClick: React.MouseEventHandler = () => {
        let { onSelectMenuItem } = context;
        onSelectMenuItem!(props.index);
    }

    clsName = classnames(clsName, {
        [`${getClsPrefix('active', clsPrefix)}`]: index === activeMenu,
        [`${getClsPrefix('disabled', clsPrefix)}`]: disabled
    }, className);

    return (
        <li className={clsName} onClick={handleClick}>{props.children}</li>
    );
}


MenuItem.displayName =`${displayPrefix}-MenuItem`;
MenuItem.defaultProps = {};

export default MenuItem;