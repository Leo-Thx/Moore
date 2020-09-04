import * as React from 'react';
import { IconComAttrType } from '../icon/icon.type';


type BaseMenuProps = {
    mode?: 'horizontal' | 'vertical';
};


type BaseMenuItemProps = {
    index     : string | number;
    title   : string;
    disabled: boolean;
    icon    : IconComAttrType
};

type BaseMenuGroupProps = {};
type BaseSubMenuProps   = {};


type MenuProps      = BaseMenuProps & Omit<React.HTMLAttributes<HTMLUListElement>,    ''>;
type MenuItemProps  = Partial<BaseMenuItemProps> & Omit<React.HTMLAttributes<HTMLLIElement>,   ''>;
type MenuGroupProps = BaseMenuGroupProps & Omit<React.HTMLAttributes<HTMLLIElement>,  ''>;
type SubMenuProps   = BaseSubMenuProps & Omit<React.HTMLAttributes<HTMLUListElement>, ''>;


export {
    MenuProps,
    MenuItemProps,
    MenuGroupProps,
    SubMenuProps
}