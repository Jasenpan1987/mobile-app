export const getAbbr = str => {
  const strArr = str.split(' ');
  if (strArr.length < 2) {
    return strArr[0][0].toUpperCase();
  }
  return `${strArr[0][0].toUpperCase()}${strArr[1][0].toUpperCase()}`;
};

export const numberWithCommas = (x) => {
  const parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ', ');
  return parts.join('.');
};
