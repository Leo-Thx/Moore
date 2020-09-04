import * as React from 'react';
import { render, fireEvent, waitFor, waitForElement } from '@testing-library/react';
import "@testing-library/jest-dom";
import Alert from './../alert';


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

    test('render close alert', async () => {
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

        

        // await new Promise(resolve=>{
        //     setTimeout(()=>{
        //         let element = container.querySelector('.moore-alert') as HTMLElement;
        //         expect(container).not.toContainElement(element);
        //         resolve(element);
        //     }, 1000);
        // });

        // done();

        // waitFor<Element>(()=>container.querySelector('.moore-alert') as Element)
        // waitFor<Promise<Element>>(()=>new Promise(resolve=>{
        //     // setTimeout(()=>{
        //         resolve(container.querySelector('.moore-alert') as Element);
        //     // }, 1000);
        // }).then(res=>{
        //     console.info(res.innerHTML);
        // })
    });
});

