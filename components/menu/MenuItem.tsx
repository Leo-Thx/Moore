import * as React from 'react';
import { MenuItemProps } from './Menu.type';
import classnames from 'classnames';
import { displayPrefix } from './../_config/_variables';
import { getClsPrefix } from './../_utils/_style.util';
import MenuContext, { MenuContextProps } from './MenuContext';

const menuItemPrefix  = 'menu-item';
export default class MenuItem extends React.Component<MenuItemProps> {
    static displayName = `${displayPrefix}-MenuItem`;
    static defaultProps = {};

    static contextType: React.Context<MenuContextProps> = MenuContext;

    render() {
        let clsPrefix = getClsPrefix(menuItemPrefix),
            clsName = classnames(clsPrefix),
            { className, index } = this.props;
        
        let { activeLevel } = this.context as React.ContextType<typeof MenuContext>;

        clsName = classnames(clsName, {
            [`${getClsPrefix('active', clsPrefix)}`]: index === activeLevel + 1
        }, className);

        return (
            <li className={clsName}>MenuItem</li>
        );
    }
}