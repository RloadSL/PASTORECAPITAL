import { useEffect, useState } from "react";

export const useComponentUtils = () => {

  const buildClassName = (arg: Array<string> | string, style: any): string => {

    if (!arg) return '';
    if (typeof arg === 'string') {
      return style[arg];
    } else {
      return arg.map((className: string) => style[className]).toString().replace(/,/g, ' ')
    }
  }

  const limitTextLength = (maxChars: number, text: string) => {
    if (text.length > maxChars) {
      return `${text.substring(0, maxChars)}...`
    } else {
      return text;
    }
  }

  return { buildClassName, limitTextLength }
}