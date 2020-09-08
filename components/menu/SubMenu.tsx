import * as React from 'react';
import classnames from 'classnames';

import { displayPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';

import { SubMenuProps } from './Menu.type';
import { renderIconNode } from '../icon/icon';
import InternalMenu, { useMenuPaddingLeft, renderMenuIcon } from './InternalMenu';


const subMenuPrefix  = 'submenu';
const SubMenu: React.FunctionComponent<SubMenuProps> = props => {
    let clsPrefix         = getClsPrefix(subMenuPrefix),
        clsName           = classnames(clsPrefix),
        arrowIcon         = renderIconNode('down'),
        titleClsName      = getClsPrefix('title', clsPrefix),
        arrowClsName      = getClsPrefix('arrow', clsPrefix),
        [opened, setOpen] = React.useState(false);

    let { className, children, title, disabled, icon, ...restProps } = props;
    
    let styleObj = useMenuPaddingLeft(),
        iconNode = renderMenuIcon(icon!);

    let handleClick = React.useCallback((event: React.MouseEvent)=> {
        if(!disabled) setOpen(!opened);
    }, [ opened, disabled ]);

    
    clsName = classnames(clsName, {
        [`${clsName}-disabled`]: disabled,
        [`${clsName}-open`]    : opened
    }, className);

    return (
        <li className={clsName}>
            <div className={titleClsName} style={styleObj} onClick={handleClick}>
                {iconNode}
                {title}
                <span className={arrowClsName}>{arrowIcon}</span>
            </div>
            <InternalMenu {...restProps}>{children}</InternalMenu>
        </li>
    );
};


SubMenu.displayName = `${displayPrefix}-SubMenu`;
SubMenu.defaultProps = {};

export default SubMenu;