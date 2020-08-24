import * as React from 'react';
import { render } from '@testing-library/react';
import "@testing-library/jest-dom";
import Button from './../button';

describe('test button component', () => {
    test('render button', () => {
        let wrapperContainer = render(<Button>renderTest</Button>);
        const { container } = wrapperContainer;
        const button = container.querySelector('button');
        const text = wrapperContainer.getByText('renderTest');

        expect(text?.innerHTML).toBe('renderTest');
        
        expect(button).toHaveClass('moore-btn');
    });
});

