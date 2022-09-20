export const useComponentUtils = () => {

  const buildClassName = (arg: Array<string> | string): string => {
    return typeof arg === 'string' ? arg : arg.join(' ');
  }

  const limitTextLength = (maxChars: number, text: string) => {
    if (text.length > maxChars) {
      return `${text.substring(0, maxChars)}...`
    } else {
      return text;
    }
  }

  return { buildClassName, limitTextLength}
}