import { max } from 'moment';
import * as React from 'react';
import { RippleProps } from './ripple.type';

let uid = 0;
let Ripple: React.FC<RippleProps> = (props) => {
    let spanRef = React.useRef<HTMLSpanElement>(null),
        [rippleArray, setRippleArray] = React.useState<Array<{id: number, node: React.ReactElement}>>([]);
    
    let removeRippleChild = React.useCallback(function removeRippleChild(event: React.SyntheticEvent, currentRippleId: number) {
        let index = rippleArray.findIndex(item=>item.id === currentRippleId);
        if( index !== -1 ) {
            rippleArray.splice(index, 1);
            setRippleArray(rippleArray.slice());
        }
    }, [ rippleArray ]);

    let renderRipple = (event: React.MouseEvent, handleAnimationEnd: React.AnimationEventHandler) => {
        let nativeEvent   = event.nativeEvent,
            currentTarget = spanRef && event.currentTarget as HTMLSpanElement,
            width         = currentTarget.offsetWidth,
            height        = currentTarget.offsetHeight,
            offsetX       = nativeEvent.offsetX,
            offsetY       = nativeEvent.offsetY,
            maxX          = Math.max(offsetX, width - offsetX),
            maxY          = Math.max(offsetY, height - offsetY),
            virtualR      = Math.sqrt(Math.pow(maxX, 2) + Math.pow(maxY, 2)),

            style = {
                width : 2* virtualR,
                height: 2* virtualR,
                left  : -(virtualR - offsetX),
                top   : -(virtualR - offsetY)
            };
        return <span className="moore-ripple-enter" style={style} onAnimationEnd={handleAnimationEnd}></span>;
    };
    
    let handleClick = React.useCallback((event: React.MouseEvent)=>{
        let currentRippleId = ++uid,
            handleAnimationEnd = (event: React.SyntheticEvent)=>{
                removeRippleChild(event, currentRippleId)
            };
            
        rippleArray.push({
            id: currentRippleId,
            node: renderRipple(event, handleAnimationEnd)
        });

        setRippleArray(rippleArray.slice());
    }, [ rippleArray, uid ]);
    
    return <span className="moore-ripple-root" onClick={handleClick} ref={spanRef}>
        {
            rippleArray.map(item=>{
                return React.cloneElement(item.node, {
                    key: item.id
                })
            })
        }
    </span>
}

export default Ripple;