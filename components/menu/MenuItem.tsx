import * as React from 'react';
import { MenuItemProps } from './Menu.type';
import classnames from 'classnames';
import { displayPrefix } from './../_config/_variables';
import { getClsPrefix, devWarning } from './../_utils/_style.util';
import MenuContext from './MenuContext';
import { useMenuPaddingLeft, renderMenuIcon } from './InternalMenu';

const menuItemPrefix  = 'menu-item';
const MenuItem: React.FunctionComponent<MenuItemProps> = props => {

    let clsPrefix = getClsPrefix(menuItemPrefix),
        clsName = classnames(clsPrefix),
        { className, index, disabled, icon, ...restProps } = props;
    
    let context = React.useContext(MenuContext),
        styleObj = useMenuPaddingLeft(),
        iconNode = renderMenuIcon(icon!);

    const handleClick: React.MouseEventHandler = () => {
        let { onSelectMenuItem } = context;
        if( !props.disabled ) onSelectMenuItem!(props.index);
    }

    clsName = classnames(clsName, {
        [`${getClsPrefix('active', clsPrefix)}`]: index === context.activeMenu,
        [`${getClsPrefix('disabled', clsPrefix)}`]: disabled
    }, className);

    // let pushSuccess = context._pushIndexToArray(index);
    // if( !pushSuccess ) {
    //     devWarning(`the index: ${index} is already exist !`);
    //     context._removeIndexFromArray(index);
    // }

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