import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import "@testing-library/jest-dom";
import Button from './../button';
import ButtonGroup from './../buttonGroup';
import { getClsPrefix } from './../../_utils/_style.util';

describe('test buttonGroup Componnet', ()=>{
    it('test render', () => {
        let wrapper = render(
            <ButtonGroup>
                <Button>Default</Button>
            </ButtonGroup>
        );

        const button = wrapper.container.querySelector('button');
        const groupDiv = wrapper.container.getElementsByClassName(getClsPrefix('btn-group'))

        expect(groupDiv).toBeTruthy();
        expect(button).toHaveClass(getClsPrefix('btn'));
    });

    it('test render more', () => {
        let wrapper = render(
            <ButtonGroup size="sm" vertical>
                <Button>Default</Button>
                <Button>Default2</Button>
            </ButtonGroup>
        );

        const groupDiv = wrapper.container.querySelector('.'+getClsPrefix('btn-group'));
        const buttonArray = groupDiv?.querySelectorAll('button');

        expect(groupDiv).toBeTruthy();
        expect(buttonArray?.length).toBe(2);
        expect(groupDiv).toHaveClass(getClsPrefix('btn-group-sm'), getClsPrefix('btn-group-vertical'));
    });
});