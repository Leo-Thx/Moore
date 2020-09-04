import * as React from 'react';


type BaseMenuProps = {
    mode?: 'horizontal' | 'vertical';
};


type BaseMenuItemProps = {};
type BaseMenuGroupProps = {};
type BaseSubMenuProps = {};


type MenuProps = BaseMenuProps & Omit<React.HTMLAttributes<HTMLUListElement>, ''>;
type MenuItemProps = BaseMenuItemProps & Omit<React.HTMLAttributes<HTMLLIElement>, ''>;
type MenuGroupProps = BaseMenuGroupProps & Omit<React.HTMLAttributes<HTMLLIElement>, ''>;
type SubMenuProps = BaseSubMenuProps & Omit<React.HTMLAttributes<HTMLUListElement>, ''>;


export {
    MenuProps,
    MenuItemProps,
    MenuGroupProps,
    SubMenuProps
}