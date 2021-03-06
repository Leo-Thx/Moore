import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import Button from './../button';


describe('test button component', () => {
    test('render default button', () => {
        let wrapperContainer = render(<Button className="myClass">renderTest</Button>),
            container = wrapperContainer.container;
        
        const button = container.querySelector('button');
        const text = wrapperContainer.getByText('renderTest');

        expect(text?.tagName).toMatch(/span/i);
        expect(button).toHaveClass('moore-btn', 'myClass');
    });

    test('render primary button', () => {
        let wrapperContainer = render(<Button type="primary">primary</Button>),
            container = wrapperContainer.container;
        
        const button = container.querySelector('button');
        expect(button).toHaveClass('moore-btn', 'moore-btn-primary');
    });

    test('render text block button', () => {
        let wrapperContainer = render(<Button type="text" block>text</Button>),
            container = wrapperContainer.container;
        
        const button = container.querySelector('button');
        const text = wrapperContainer.getByText('text');

        expect(text).toBeTruthy();
        expect(button).toHaveClass('moore-btn', 'moore-btn-text', 'moore-btn-block');
    });

    test('render handle click', () => {
        const handleClick = function() {
            console.info(arguments);
            return 'handleClick'
        };

        let wrapperContainer = render(<Button type="text" block onClick={handleClick}>text</Button>),
            container = wrapperContainer.container;
        
        const button = container.querySelector('button');
        
        const result = fireEvent(button as HTMLElement, new MouseEvent('click'));
        expect(result).toBe(true);
    });

    test('render Icon Button', () => {
        let wrapperContainer = render(<Button type="primary" icon="close">Primary</Button>),
            container = wrapperContainer.container;

        const button = container.querySelector('button');
        const icon = container.querySelector('i');
        
        expect(button).toBeTruthy();
        expect(icon).toBeTruthy();
        expect(icon).toHaveClass('moore-icon');
    });

    test('render Single Icon Button', ()=>{
        let wrapperContainer = render(<Button type="primary" icon="close" />),
            container = wrapperContainer.container;

        const button = container.querySelector('button');
        const icon = container.querySelector('i');
        const child = button?.childElementCount;

        expect(child).toBe(1);
        expect(button?.firstElementChild?.tagName).toMatch(/i/ig);
        expect(button).toHaveClass('moore-btn-icon-only');
    });
});

