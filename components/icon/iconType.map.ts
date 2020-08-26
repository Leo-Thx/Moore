// 可用类型
export type TypeKey = 'close';


// 具体unicode映射列表
const IconTypeToUnicode: {[key: string]: string} = {
    close: '&#xe7fc;'
};


type BaseIconType = Partial<{
    [ key in TypeKey ]: Partial<{   // 映射属性
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
 * href   : 'close',
 * unicode: '&#xe7fc;
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
const IconType = {} as { [P in TypeKey]: string };


Object.keys(IconTypeToUnicode).forEach((key)=>{
    IconType   [ key as TypeKey ] = key;
    IconTypeMap[ key as TypeKey ] = {
        href   : key,
        unicode: IconTypeToUnicode[ key ]
    };
});



export { IconTypeMap, IconType };