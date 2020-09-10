import * as React from 'react';

export type MenuContextProps = {    
    // 当前激活的按钮
    activeMenu: string;
    // 选中列表项
    onSelectMenuItem?: (activeInde: string) => void;

    // 菜单缩进长度
    inlineIndent: number;
    
    // 当前渲染层级
    renderLevel: number;
    renderIndex: string;

    // 是否是水平模式
    horizontal: boolean;

    subMenuContainer?: HTMLDivElement|null
};


export default React.createContext<MenuContextProps>({
    activeMenu      : '',
    onSelectMenuItem: () => {},
    inlineIndent    : 24,
    renderLevel     : 0,
    renderIndex     : '',
    horizontal      : false
});

