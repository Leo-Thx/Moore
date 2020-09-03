import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import Alert from './../alert';
import { act } from 'react-dom/test-utils';


describe('Test Alert Component', () => {
    test('render default alert', () => {
        let wrapperContainer = render(<Alert type="info" title="title" />),
            container = wrapperContainer.container;

        let alert = container.querySelector('.moore-alert');
        let title = alert?.querySelector('.moore-alert-title');
        expect(alert).toHaveClass('moore-alert', 'moore-alert-info');
        expect(title).toHaveClass('moore-alert-title');
        expect(title?.innerHTML).toBe('title');
    });

    test('render desc alert', () => {
        let wrapperContainer = render(<Alert type="info" title="title" desc="desc"/>),
            container = wrapperContainer.container;

        let alert = container.querySelector('.moore-alert');
        let title = alert?.querySelector('.moore-alert-title');
        let desc = alert?.querySelector('.moore-alert-content');
        
        expect(alert).toHaveClass('moore-alert', 'moore-alert-info', 'moore-alert-with-desc');
        expect(title).toBeTruthy();
        expect(desc).toBeTruthy();
    
    });

    test('render close alert', () => {
        const handleClose = function() {};

        let wrapperContainer = render(<Alert type="info" title="title" desc="desc" closeable onClose={handleClose}/>),
            container = wrapperContainer.container;

        let alert = container.querySelector('.moore-alert');
        let title = alert?.querySelector('.moore-alert-title');
        let desc = alert?.querySelector('.moore-alert-content');
        let close = alert?.querySelector('.moore-alert-close')
        
        expect(alert).toHaveClass('moore-alert', 'moore-alert-info', 'moore-alert-with-desc');
        expect(title).toBeTruthy();
        expect(desc).toBeTruthy();
        expect(close).toBeTruthy();

        
        fireEvent.click(close!);
        expect(alert).toHaveClass('moore-alert-destory');

        // return new Promise((resolve)=>{
        //     setTimeout(()=>{
        //         expect(container.querySelector('.moore-alert')).not.toBeTruthy();
        //         resolve();
        //     }, 1000);
        // });
    });
});

