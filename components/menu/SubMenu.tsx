import * as React from 'react';
import classnames from 'classnames';

import { displayPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';

import { SubMenuProps, MenuItemProps } from './Menu.type';
import MenuItem from './MenuItem';
import MenuContext from './MenuContext';


const subMenuPrefix  = 'sub-menu';
const SubMenu: React.FunctionComponent<SubMenuProps> = props => {
    let clsPrefix = getClsPrefix(subMenuPrefix),
        clsName = classnames(clsPrefix),
        { className, children, title, disabled } = props;

    let context = React.useContext(MenuContext);
    let contextValue = {
        ...context,
        renderLevel: context.renderLevel + 1
    };

    let childs = React.Children.map(children as Array<React.FunctionComponentElement<MenuItemProps>>, Child => {
        let nameReg = new RegExp([MenuItem.displayName, SubMenu.displayName].join('|'), 'ig');

        if( nameReg.test( Child.type.displayName! ) ) {
            return <MenuContext.Provider value={contextValue}>
                {
                    React.cloneElement(Child, {
                        ...Child.props
                    })
                }
            </MenuContext.Provider>
        }
        return null;
    });

    
    clsName = classnames(clsName, {
        [`${clsName}-disabled`]: disabled
    }, className);    

    return (
        <li className={clsName}>
            <div className={getClsPrefix('title', clsPrefix)}>{title}</div>
            <ul className={getClsPrefix('menu')}>
                { childs && childs }
            </ul>
        </li>
    );
};


SubMenu.displayName = `${displayPrefix}-SubMenu`;
SubMenu.defaultProps = {};

export default SubMenu;