import * as React from 'react';

let _indexArray = [] as Array<string>,
    _pushIndexToArray = (index: string) => {
        if( _indexArray.indexOf(index) === -1 ) {
            _indexArray.push( index );
            return true;
        }
        return false;
    };

let renderLevel = 1,
    setRenderLevel = (level: number) => renderLevel = level;


export type MenuContextProps = {    
    // 当前激活的按钮
    activeMenu: string;
    // 选中列表项
    onSelectMenuItem?: (activeInde: string) => void;

    // 菜单缩进长度
    inlineIndent: number;

    // 存储所有菜单的index
    _indexArray?     : Array<string>;
    _pushIndexToArray: (index: string) => boolean;
    
    // 当前渲染的层级
    renderLevel  : number;
    setRenderLevel: (level: number) => void;
};


export default React.createContext<MenuContextProps>({
    activeMenu      : '',
    onSelectMenuItem: () => {},

    inlineIndent: 24,
    
    _indexArray      : _indexArray,
    _pushIndexToArray: _pushIndexToArray,

    renderLevel: renderLevel,
    setRenderLevel: setRenderLevel
});

