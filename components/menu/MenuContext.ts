import * as React from 'react';

export type MenuContextProps = {
    // activeLevel: number;
    // activeIndex: number;
    
    // 当前激活的按钮
    activeMenu: string;
    // 当前展开的subMenu
    onSelectMenuItem?: (activeInde: string) => void;
};


export default React.createContext<MenuContextProps>({
    // activeLevel: -1,
    // activeIndex: -1
    activeMenu      : '',
    onSelectMenuItem: () => {}
});

