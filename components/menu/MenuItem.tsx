import * as React from 'react';
import { MenuItemProps } from './Menu.type';
import classnames from 'classnames';
import { displayPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';
import MenuContext from './MenuContext';
import { useMenuPaddingLeft, renderMenuIcon } from './InternalMenu';

const menuItemPrefix  = 'menu-item';
const MenuItem: React.FunctionComponent<MenuItemProps> = props => {

    let clsPrefix = getClsPrefix(menuItemPrefix),
        clsName = classnames(clsPrefix),
        { className, index, disabled, icon, ...restProps } = props;
    
    let context  = React.useContext(MenuContext),
        styleObj = useMenuPaddingLeft(),
        iconNode = renderMenuIcon(icon!);

    const handleClick: React.MouseEventHandler = () => {
        let { onSelectMenuItem } = context;
        if( !props.disabled ) onSelectMenuItem!(index!);
    }

    clsName = classnames(clsName, {
        [`${getClsPrefix('active', clsPrefix)}`]: index === context.activeMenu,
        [`${getClsPrefix('disabled', clsPrefix)}`]: disabled
    }, className);

    return (
        <li className={clsName} 
            style={styleObj} 
            onClick={handleClick}
            {...restProps}>
                {iconNode}
                {props.children}
            </li>
    );
}


MenuItem.displayName =`${displayPrefix}-MenuItem`;
MenuItem.defaultProps = {};

export default MenuItem;