import * as React from 'react';
import { MenuItemProps } from './Menu.type';
import classnames from 'classnames';
import { displayPrefix, ComponentPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';
import MenuContext from './MenuContext';
import { renderMenuIcon, useMenuPaddingLeft } from './Menu.helper';


const MenuItem: React.FunctionComponent<MenuItemProps> = props => {
    let clsPrefix = getClsPrefix(ComponentPrefix.MENU_ITEM),
        clsName = classnames(clsPrefix),
        { className, index, disabled, icon, children, ...restProps } = props;
    
    let context     = React.useContext(MenuContext),
        paddingLeft = useMenuPaddingLeft(),
        iconNode    = renderMenuIcon(icon),
        { onSelectMenuItem, renderLevel, _key } = context;

    clsName = classnames(clsName, {
        [`${getClsPrefix('active', clsPrefix)}`]: index === context.activeMenu,
        [`${getClsPrefix('disabled', clsPrefix)}`]: disabled
    }, className);

    let styleObject = {} as React.CSSProperties;
    if( paddingLeft ) styleObject.paddingLeft = paddingLeft;

    const handleClick: React.MouseEventHandler = React.useCallback((event) => {
        if( !disabled ) {
            onSelectMenuItem(renderLevel, index!, event);
        }
        event.stopPropagation();
    }, [index, context, disabled, renderLevel]);


    return (
        <li data-level={renderLevel} data-key={_key} data-index={index} className={clsName} style={styleObject} 
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