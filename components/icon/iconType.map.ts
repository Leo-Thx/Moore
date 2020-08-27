import { IconTypeKey, BaseIconType } from './icon.type';


// 具体unicode映射列表
const IconTypeToUnicode: {[key: string]: string} = {
    close: '&#xe7fc;'
};

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
//     [P in IconTypeKey]: string 
// };


// 初始化应有的映射icon
Object.keys(IconTypeToUnicode).forEach((key)=>{
    // IconType   [ key as IconTypeKey  ] = key;
    IconTypeMap[ key as IconTypeKey ] = {
        href   : key,
        unicode: IconTypeToUnicode[ key ]
    };
});



export { IconTypeMap };