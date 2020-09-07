import * as React from 'react';
import { IconComAttrType } from '../icon/icon.type';


type BaseMenuProps = {
    mode?         : 'horizontal' | 'vertical';
    inlineIndent? : number;
    accordion?    : boolean;
    defaultActive?: string;
};


type BaseMenuItemProps = {
    index    : string;
    disabled?: boolean;
    icon?    : IconComAttrType
};


type BaseSubMenuProps   = {
    index    : string;
    disabled?: boolean;
    icon?    : IconComAttrType;
    title    : string;
};


type BaseMenuGroupProps = {};


type MenuProps      = BaseMenuProps & Omit<React.HTMLAttributes<HTMLUListElement>,    ''>;
type MenuItemProps  = BaseMenuItemProps & Omit<React.HTMLAttributes<HTMLLIElement>,   ''>;
type MenuGroupProps = BaseMenuGroupProps & Omit<React.HTMLAttributes<HTMLLIElement>,  ''>;
type SubMenuProps   = BaseSubMenuProps & Omit<React.HTMLAttributes<HTMLUListElement>, ''>;


// 菜单类型: 包含内部菜单使用项
type MenuTypeDeclaration = React.FunctionComponent<MenuProps> & {
    MenuItem : React.FunctionComponent<MenuItemProps>,
    SubMenu  : React.FunctionComponent<SubMenuProps>,
    MenuGroup: React.FunctionComponent<MenuGroupProps>
};


export {
    MenuProps,
    MenuItemProps,
    MenuGroupProps,
    SubMenuProps,
    MenuTypeDeclaration
}