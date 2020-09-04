import * as React from 'react';

export type MenuContextProps = {
    activeLevel: number;
    activeIndex: number;
};


export default React.createContext<MenuContextProps>({
    activeLevel: -1,
    activeIndex: -1
});

