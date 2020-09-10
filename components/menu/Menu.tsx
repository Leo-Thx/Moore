import * as React from 'react';
import classnames from 'classnames';

import { displayPrefix, ComponentPrefix } from './../_config/_variables';
import { MenuProps, MenuTypeDeclaration } from './Menu.type';

import MenuItem from './MenuItem';
import SubMenu from './SubMenu';
import MenuGroup from './MenuGroup';
import MenuContext, { MenuContextProps } from './MenuContext';
import InternalMenu from './InternalMenu';


// export default class Menu extends React.Component<MenuProps> {
//     static displayName = `${displayPrefix}.Menu`;
//     static MenuItem    = MenuItem;
//     static SubMenu     = SubMenu;
//     static MenuGroup   = MenuGroup;
// };


const Menu: MenuTypeDeclaration = props => {
    let { inlineIndent, defaultActive, ...restProps } = props,
        [activeMenu, setActive] = React.useState(defaultActive),
        horizontal = props.mode === 'horizontal';

    let context = React.useContext(MenuContext),
        wrapper = React.useMemo(()=> horizontal ? document.createElement('div'): null, [horizontal]);

    React.useEffect(()=>{
        if( horizontal ) {
            wrapper?.classList.add(classnames({
                [`${ComponentPrefix.MENU}-horizontal-container`]: horizontal
            }));
            document.body.append(wrapper!);
        }
        return () => {
            horizontal && wrapper!.remove();
        }
    }, [wrapper, horizontal]);


    let contextValue: MenuContextProps = React.useMemo(()=>{
        return {
            ...context,
            activeMenu      : activeMenu!,
            inlineIndent    : inlineIndent!,
            horizontal      : horizontal,
            subMenuContainer: wrapper,
            renderIndex     : `@@_${ComponentPrefix.MENU}/1`, //重置首层渲染的index索引值
            onSelectMenuItem: (index: string) => setActive(index)
        }
    }, [activeMenu, inlineIndent, horizontal]);

    return (
        <MenuContext.Provider value={contextValue}>
            <InternalMenu {...restProps} />
        </MenuContext.Provider>
    )
};


Menu.defaultProps = {
    mode: 'vertical',
    defaultActive: '',
    inlineIndent: 24
};

Menu.displayName = `${displayPrefix}-Menu`;

Menu.MenuItem  = MenuItem;
Menu.SubMenu   = SubMenu;
Menu.MenuGroup = MenuGroup;


export { MenuProps };
export default Menu