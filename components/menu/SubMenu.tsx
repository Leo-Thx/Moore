import * as React from 'react';
import { SubMenuProps } from './Menu.type';
import classnames from 'classnames';
import { clsPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';

const subMenuPrefix  = 'sub-menu';

const SubMenu: React.FunctionComponent<SubMenuProps> = props => {
    let clsPrefix = getClsPrefix(subMenuPrefix),
        clsName = classnames(clsPrefix);

    return (
        <ul className={clsName}>SubMenu</ul>
    );
}

SubMenu.displayName = `${clsPrefix}-SubMenu`;
SubMenu.defaultProps = {};

export default SubMenu;