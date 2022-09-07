export const useComponentUtils = () => {

  const buildClassName = (arg:Array<string> | string):string => {
    return typeof arg === 'string' ? arg : arg.join(' ');
  }

  return {buildClassName}
}