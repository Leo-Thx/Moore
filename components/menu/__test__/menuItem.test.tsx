import * as React from 'react';
import { render, cleanup } from '@testing-library/react';
import "@testing-library/jest-dom";
import MenuItem from '../MenuItem';
import classnames from 'classnames';
import { getClsPrefix } from '../../_utils/_style.util';

describe('Test MenuItem Component', () => {
    test('render menuItem component', () => {
        let wrapper = render(<MenuItem icon="close-circle" disabled>MenuItem</MenuItem>);

        let node = wrapper.getByText('MenuItem');
        let clsName = getClsPrefix('menu-item');
        let icon = node.querySelector('i');

        expect(node.tagName).toMatch(/li/ig);
        expect(clsName).toEqual('moore-menu-item');
        expect(node).toHaveClass(clsName, classnames(getClsPrefix('disabled', clsName)));
        expect(icon).toBeTruthy();
        cleanup();
    });
});