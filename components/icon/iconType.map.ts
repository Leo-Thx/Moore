import { IconKeyType } from './icon.type';


type AvailableIconType<T extends string> = {
    [P in T]: string;
}
// 具体unicode映射列表
// const IconTypeToUnicode: {[key: string]: string} = {
const IconTypeToUnicode: AvailableIconType<IconKeyType> = {
    'close'       : '&#xe7fc;',
    'info-circle' : '&#xe77e;',
    'check-circle': '&#xe77d;',
    'close-circle': '&#xe77f;'
};



type BaseIconType = Partial<{
    [ key in IconKeyType ]: Partial<{   // 映射属性
        href   : string;
        unicode: string;
    }>
}>;
/**
 * 初始化可用图标列表
 * @type object
 * @example
 *  {
 *      close: {
 *          href   : 'close',
 *          unicode: '&#xe7fc;
 *      }
 *  }
 */
const IconTypeMap : BaseIconType = {};

/**
 * 类型对应的值
 * @type object
 * @example
 *  { close: 'close' }
 */
// const IconType = {} as { 
//     [P in IconKeyType]: string 
// };


// 初始化应有的映射icon
Object.keys(IconTypeToUnicode).forEach((key)=>{
    // IconType   [ key as IconKeyType  ] = key;
    IconTypeMap[ key as IconKeyType ] = {
        href   : key,
        unicode: IconTypeToUnicode[ key as IconKeyType ]
    };
});



export { IconTypeMap };