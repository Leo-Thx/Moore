import * as React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";

import Menu from '../Menu';

describe('Test Menu Component', () => {
    beforeEach(()=>{
        cleanup();
    });

    function createStyle() {
        let style = document.createElement('style');
        style.type = 'text/css';
        style.textContent = `
        .moore-submenu .moore-menu {
            display: none;
        }
        .moore-submenu-open > .moore-menu {
            display: block;
        }
        `;
        return style;
    }

    test('render default menu component', () => {
        cleanup();
        let MenuWrapper = render(
            <Menu defaultActive="2">
                <Menu.MenuItem index="1">MenuItem1</Menu.MenuItem>
                <Menu.MenuItem index="2">MenuItem2</Menu.MenuItem>
                <Menu.SubMenu title="title">
                    <Menu.MenuItem index="2">MenuItem3</Menu.MenuItem>
                    <Menu.MenuItem index="4">MenuItem4</Menu.MenuItem>
                </Menu.SubMenu>
            </Menu>
        );

        MenuWrapper.container.append(createStyle());

        let menuNode = MenuWrapper.container.querySelector('.moore-menu');
        expect(menuNode).toBeTruthy();

        let children = menuNode?.children;
        expect(children?.length).toBe(3);
        expect(children?.item(1)).toHaveClass('moore-menu-item-active');

        fireEvent.click(children?.item(0)!);
        expect(children?.item(0)).toHaveClass('moore-menu-item-active');
        expect(children?.item(1)).not.toHaveClass('moore-menu-item-active');

        let subMenu = menuNode?.querySelector('.moore-submenu'),
            subMenuNode = subMenu?.querySelector('.moore-menu');
        
        // let styles = window.getComputedStyle(subMenuNode!);
        // console.info(styles.getPropertyValue('display'));

        expect(subMenuNode).not.toBeVisible();
        fireEvent.click(subMenu!);
        expect(subMenu).toHaveClass('moore-submenu-open');
        expect(subMenuNode).toBeVisible();
    });
});