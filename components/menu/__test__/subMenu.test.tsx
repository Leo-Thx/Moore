import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import MenuItem from '../MenuItem';
import classnames from 'classnames';
import { getClsPrefix } from '../../_utils/_style.util';
import SubMenu from '../SubMenu';

describe('Test SubMenu Component', () => {
    test('render default submenu', () => {
        let wrapper = render(<SubMenu title="Title" icon="close">
            <MenuItem>MenuItem</MenuItem>
            <span>test</span>
        </SubMenu>);

        let titleNode = wrapper.getByText('Title'),
            iconNode = titleNode.querySelector('.moore-icon'),
            arrowNode = titleNode.querySelector('.moore-submenu-arrow'),
            subMenu = wrapper.container.querySelector('.moore-submenu');
            
        expect(subMenu?.tagName).toMatch(/li/i);
        expect(subMenu?.childElementCount).toBe(2);

        expect(titleNode.tagName).toMatch(/div/i);
        expect(titleNode).toHaveClass('moore-submenu-title');

        expect(iconNode).toBeTruthy();
        expect(arrowNode).toBeTruthy();
        expect(arrowNode?.firstElementChild?.tagName).toMatch(/i/ig);

        cleanup();
    });
});