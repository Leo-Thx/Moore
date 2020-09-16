import * as React from 'react';
import { IconComAttrType } from '../icon/icon.type';


type BaseMenuProps = {
    mode?         : 'horizontal' | 'vertical';
    inlineIndent? : number;
    accordion?    : boolean;
    defaultActive?: string;
    
    onClick? : (level: number, index: string, event: React.MouseEvent) => void;
    onSelect?: (level: number, index: string, event: React.MouseEvent) => void;
};


type BaseMenuItemProps = {
    index?   : string;
    disabled?: boolean;
    icon?    : IconComAttrType;
};


type BaseSubMenuProps = {
    index?   : string;
    disabled?: boolean;
    icon?    : IconComAttrType;
    title    : string;
};


type BaseMenuGroupProps = {
    index?: string;
    title : string;
};


type PickType = 'className'|'children'|'style';

type MenuProps = BaseMenuProps & Pick<React.HTMLAttributes<HTMLUListElement>, PickType>;
type InternalMenuProps = MenuProps & { ref? : React.Ref<HTMLUListElement>; }

type MenuGroupProps = BaseMenuGroupProps & Pick<React.HTMLAttributes<HTMLLIElement>, PickType>;
type SubMenuProps   = BaseSubMenuProps & Pick<React.HTMLAttributes<HTMLLIElement>,   PickType>;

type MenuItemProps = BaseMenuItemProps & Pick<React.HTMLAttributes<HTMLLIElement>, PickType>;


// 菜单类型: 包含内部菜单使用项
type MenuTypeDeclaration = React.FunctionComponent<MenuProps> & {
    MenuItem : React.FunctionComponent<MenuItemProps>,
    SubMenu  : React.FunctionComponent<SubMenuProps>,
    MenuGroup: React.FunctionComponent<MenuGroupProps>
};


export {
    MenuProps, InternalMenuProps, MenuTypeDeclaration,
    
    MenuItemProps,

    MenuGroupProps,
    
    SubMenuProps
}