import * as React from 'react';
import { IconComAttrType } from '../icon/icon.type';


type BaseMenuProps = {
    mode?         : 'horizontal' | 'vertical';
    inlineIndent? : number;
    accordion?    : boolean;
    defaultActive?: string;
    ref?          : React.Ref<HTMLUListElement>
};


type BaseMenuItemProps = {
    index?   : string;
    disabled?: boolean;
    icon?    : IconComAttrType
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


type MenuProps = BaseMenuProps & Pick<React.HTMLAttributes<HTMLUListElement>, 'className'|'children'|'style'>;

type MenuGroupProps = BaseMenuGroupProps & Pick<React.HTMLAttributes<HTMLLIElement>, 'className'|'children'|'style'>;
type SubMenuProps   = BaseSubMenuProps & Pick<React.HTMLAttributes<HTMLLIElement>,   'className'|'children'|'style'>;

type MenuItemProps = BaseMenuItemProps & Pick<React.HTMLAttributes<HTMLLIElement>, 'className'|'children'|'style'>;


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