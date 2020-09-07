import { clsPrefix } from './../_config/_variables';

/**
 * 获取class前缀
 * @param prefix class前缀
 * @param cusPrefix 自定义前缀，默认moore
 * @example
 *  getClsPrefix('btn') -> moore-btn
 *  getClsPrefix('btn', 'myclass') -> myclass-btn
 */
export const getClsPrefix:(prefix: string, cusPrefix?: string) => string = (prefix, cusPrefix = clsPrefix) => [ cusPrefix, prefix ].join('-');


/**
 * 输出警告的消息
 * @param message 打印的信息
 */
export const devWarning: (message: string) => void = message => console.warn(message);
