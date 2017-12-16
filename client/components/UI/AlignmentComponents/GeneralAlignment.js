import React from 'react';
import PropTypes from 'prop-types';

import { HorizontalAlignment } from './HorizontalAlignment';
import { VerticalAlignment } from './VerticalAlignment';

const getAlignmentClassnames = (alignment) => {
  if (alignment === 'center') return { vertical: 'middle', horizontal: 'middle' };
  const alignments = alignment.split('-');
  return { vertical: alignments[0], horizontal: alignments[1] };
};

export const GeneralAlignment = ({ children, alignment, className, ...rest }) => {
  const alignmentClassnames = getAlignmentClassnames(alignment);
  return (
    <VerticalAlignment alignment={alignmentClassnames.vertical} className={className} {...rest}>
      <HorizontalAlignment alignment={alignmentClassnames.horizontal}>
        {children}
      </HorizontalAlignment>
    </VerticalAlignment>
  );
};

GeneralAlignment.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  alignment: PropTypes.oneOf(['top-left', 'top-right', 'top-middle', 'center', 'bottom-left', 'bottom-right', 'bottom-middle', 'middle-middle']).isRequired,
  rest: PropTypes.any
};
