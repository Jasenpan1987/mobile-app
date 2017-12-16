import * as React from 'react';
import PropTypes from 'prop-types';
import { Style } from './Style';

export const BackgroundImageStyle = ({ selector, src, colorSet }) => {
  // Convert hex and opacity to rgba
  // e.g. #FFFFFF, 1 to rgba(255,255,255,1)
  const hexToRgba = function (hex, opacity) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = `0x${c.join('')}`;
      return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')}, ${opacity})`;
    }
    throw new Error('Bad Hex');
  };

  return (
    <Style
      selector={selector}
      styles={`
          background-image:
            -moz-linear-gradient(45deg, ${colorSet.map(c => `${hexToRgba(c.hex, c.opacity)} ${c.percent}%`).join(',')}),
            url(${window.API_BASE}/images/${src});
          background-image:
            -webkit-gradient(left bottom, right top, ${colorSet.map(c => `color-stop(${c.percent}%, ${hexToRgba(c.hex, c.opacity)})`).join(',')}),
            url(${window.API_BASE}/images/${src});
          background-image:
            -webkit-linear-gradient(45deg, ${colorSet.map(c => `${hexToRgba(c.hex, c.opacity)} ${c.percent}%`).join(',')}),
            url(${window.API_BASE}/images/${src});
          background-image:
            -o-linear-gradient(45deg, ${colorSet.map(c => `${hexToRgba(c.hex, c.opacity)} ${c.percent}%`).join(',')}),
            url(${window.API_BASE}/images/${src});
          background-image:
            -ms-linear-gradient(45deg, ${colorSet.map(c => `${hexToRgba(c.hex, c.opacity)} ${c.percent}%`).join(',')}),
            url(${window.API_BASE}/images/${src});
          background-image:
            linear-gradient(45deg, ${colorSet.map(c => `${hexToRgba(c.hex, c.opacity)} ${c.percent}%`).join(',')}),
            url(${window.API_BASE}/images/${src});
          background-size: 100% auto;
        `}
    />
  );
};

BackgroundImageStyle.propTypes = {
  selector: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  colorSet: PropTypes.array
};
