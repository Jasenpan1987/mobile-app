import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectLotListByKeywords } from './selectors';

import { ListRow, CircleDecoration } from '../UI/ListComponents';
import { LotStatus } from '../../shared/components/LotStatus';

const LotListDisplayComponent = ({ lotList, projectId }) => {
  return (
    <ul>
      {lotList.map(lot => {
        const { number, id, signContractLabel, lotStatusName } = lot;
        return (
          <ListRow key={`lot-${id}`} to={`${ROUTE_BASE}/projects/${projectId}/lots/${id}`}>
            <CircleDecoration circle={`${number}`}>
              <LotStatus status={signContractLabel}>
                <h4>{number}</h4>
                <span>{`${lotStatusName}`}</span>
              </LotStatus>
            </CircleDecoration>
          </ListRow>
        );
      })}
    </ul>
  );
};

function mapStateToProps(state) {
  return {
    lotList: selectLotListByKeywords(state)
  };
}

LotListDisplayComponent.propTypes = {
  lotList: PropTypes.object.isRequired,
  projectId: PropTypes.string.isRequired
};

export const LotListDisplay = connect(mapStateToProps, null)(LotListDisplayComponent);
