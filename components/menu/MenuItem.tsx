import * as React from 'react';
import { MenuItemProps } from './Menu.type';
import classnames from 'classnames';
import { displayPrefix, ComponentPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';
import MenuContext from './MenuContext';
import { useMenuPaddingLeft, renderMenuIcon } from './InternalMenu';


const MenuItem: React.FunctionComponent<MenuItemProps> = props => {
    let clsPrefix = getClsPrefix(ComponentPrefix.MENU_ITEM),
        clsName = classnames(clsPrefix),
        { className, index, disabled, icon, children, ...restProps } = props;
    
    let context  = React.useContext(MenuContext),
        styleObj = useMenuPaddingLeft(),
        iconNode = renderMenuIcon(icon);

    const handleClick: React.MouseEventHandler = React.useCallback((event) => {
        let { onSelectMenuItem, renderLevel } = context;
        if( !props.disabled ) {
            onSelectMenuItem(renderLevel, index!, event);
        }
        event.stopPropagation();
    }, [index, context]);


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
                {children}
            </li>
    );
}


MenuItem.displayName =`${displayPrefix}-MenuItem`;
MenuItem.defaultProps = {};

export default MenuItem;