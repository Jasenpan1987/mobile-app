import React from 'react';

import { Loading } from '../Loading';
import localStyles from './LoadingLayer.scss';

export const LoadingLayer = () => {
  return (
    <div className={localStyles.loadingWrapper}>
      <div>
        <Loading
          size={'large'}
          color={'#0696B7'}
        />
      </div>
    </div>
  );
};
