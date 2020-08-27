import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import Icon from './../icon';


describe('test icon component', () => {
    test('render default icon', () => {
        let wrapperContainer = render(<Icon type="close"></Icon>),
            container = wrapperContainer.container;
        
        const icon = container.querySelector('i');

        expect(icon?.tagName).toMatch(/i/i);
        expect(icon).toHaveClass('moore-icon');
    });
});

