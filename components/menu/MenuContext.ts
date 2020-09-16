import * as React from 'react';

export type OpenMenuKeyType = { 
    keys: Array<string>, 
    currentLevel: number; 
}
export type DispatchMenuOpen = {
    type: 'add'|'remove'|'clear', 
    payload: {
        key: string, 
        level?: number
    }
};

export type MenuContextProps = {    
    // 当前激活的按钮
    activeMenu?: string;

    // 选中列表项
    onSelectMenuItem: (level: number, index: string, event: React.MouseEvent) => void;

    // 菜单缩进长度
    inlineIndent: number;
    
    // 当前渲染层级
    renderLevel: number;
    renderIndex: string;
    _key       : string;

    // 是否是水平模式
    horizontal: boolean;

    // 水平模式下渲染子节点的容器
    subMenuContainer?: HTMLDivElement|null;
    
    // 是否延迟渲染子节点
    // lazy: boolean;

    // 当前已经打开的subMenu
    openedKey   : OpenMenuKeyType;
    dispatchOpen: React.Dispatch<DispatchMenuOpen>;
};


export default React.createContext<MenuContextProps>({
    onSelectMenuItem: () => {},

    activeMenu  : '',
    inlineIndent: 24,
    renderLevel : 0,
    renderIndex : '',
    _key        : '',
    horizontal  : false,

    openedKey: {keys: [], currentLevel: 0},
    dispatchOpen: () => {}
});

