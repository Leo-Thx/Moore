import * as React from 'react';
import { MenuItemProps } from './Menu.type';
import classnames from 'classnames';
import { displayPrefix } from './../_config/_variables';
import { getClsPrefix, devWarning } from './../_utils/_style.util';
import MenuContext from './MenuContext';

const menuItemPrefix  = 'menu-item';
const MenuItem: React.FunctionComponent<MenuItemProps> = props => {

    let clsPrefix = getClsPrefix(menuItemPrefix),
        clsName = classnames(clsPrefix),
        { className, index, disabled } = props;

    
    let context = React.useContext(MenuContext),
        { activeMenu, renderLevel, inlineIndent } = context;

    const handleClick: React.MouseEventHandler = () => {
        let { onSelectMenuItem } = context;
        if( !props.disabled ) onSelectMenuItem!(props.index);
    }

    clsName = classnames(clsName, {
        [`${getClsPrefix('active', clsPrefix)}`]: index === activeMenu,
        [`${getClsPrefix('disabled', clsPrefix)}`]: disabled
    }, className);

    let pushSuccess = context._pushIndexToArray(index);
    if( !pushSuccess ) devWarning(`the index: ${index} is already exist !`);

    let style = {} as React.CSSProperties;
    if( renderLevel === 1 ) {}
    else style.paddingLeft = (renderLevel - 1) * inlineIndent;

    return (
        <li className={clsName} 
            style={style} 
            onClick={handleClick}>{props.children}</li>
    );
}


MenuItem.displayName =`${displayPrefix}-MenuItem`;
MenuItem.defaultProps = {};

export default MenuItem;