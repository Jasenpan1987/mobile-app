export function isOldIE() {
  return /MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split('MSIE')[1]) < 10;
}
