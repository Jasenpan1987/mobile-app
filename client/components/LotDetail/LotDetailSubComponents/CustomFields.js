import React from 'react';
import PropTypes from 'prop-types';
import { FieldArray } from 'redux-form';

import { LotDetailSectionTitle, ExistCustomFields } from './CommonFieldsComponents';

import classnames from 'classnames';
import { sectionCls } from './formStyles';
import localStyles from './LotDetailSection.scss';

export const CustomFields = ({ collapse, toggleCollapse, mode, filedArrayName }) => {
  // // style class
  const contentClass = classnames(localStyles.content, collapse.isOpenned ? localStyles.open : localStyles.close);
  return (
    <div className={localStyles.container}>
      <LotDetailSectionTitle click={toggleCollapse} isOpenned={collapse.isOpenned} style={{ color: '#0B7D96' }}>
        <h5>{collapse.title}</h5>
      </LotDetailSectionTitle>
      <div className={contentClass}>
        <div className={sectionCls}>
            <FieldArray
              name={filedArrayName}
              component={ExistCustomFields}
              mode={mode}
            />
          </div>
        </div>
    </div>
  );
};

CustomFields.propTypes = {
  fields: PropTypes.object,
  toggleCollapse: PropTypes.func,
  collapse: PropTypes.object,
  mode: PropTypes.string,
  filedArrayName: PropTypes.string
};
