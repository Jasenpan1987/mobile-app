import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { LoadingLayer } from '../UI/LoadingLayer';
import { LotListDisplay } from './LotListDisplay';
import { FunctionBar } from '../../shared/components';
import { loadLotListAct, changeLotListSearchKeywordsAct, closeLotListErrorModalAct } from './actions';
import styles from './LotList.scss';

import { LotListErrorModal } from './LotListErrorModal';
import { Icon } from '../UI/Icon';

class LotListComponent extends Component {
  componentDidMount() {
    const { params: { projectId } } = this.props;
    this.props.loadLotList(projectId);
  }

  render() {
    const {
      lotListSearchKeywords, changeLotListSearchKeywords,
      isLoading, closeLotListErrorModal, isLoadErrorModalOpen
    } = this.props;
    return (
      <div className={styles.container}>
        { isLoading && <LoadingLayer />}
        <div className={styles.header}>
          <span>Lots</span>
          <div className={'pull-right'}>
            <div className={styles.search}>
              <FunctionBar
                searchKeywords={lotListSearchKeywords}
                handleChangeKeywords={changeLotListSearchKeywords}
                placeholder={('Search By Status')}
              />
              <Icon icon={'search'} />
            </div>
          </div>
        </div>
        <div>
          <LotListDisplay projectId = {this.props.params.projectId} />
        </div>
        <LotListErrorModal
          isOpen={isLoadErrorModalOpen}
          closeModal={closeLotListErrorModal}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.lotListCollection.isLoading,
    lotList: state.lotListCollection.lotList,
    lotListSearchKeywords: state.lotListSearchKeywords,
    isLoadErrorModalOpen: state.lotListCollection.isLoadErrorModalOpen
  };
}

function mapDispatchToProps(dispatch) {
  return {
    loadLotList: (projectId) => dispatch(loadLotListAct(projectId)),
    changeLotListSearchKeywords: (keywords) => dispatch(changeLotListSearchKeywordsAct(keywords)),
    closeLotListErrorModal: () => dispatch(closeLotListErrorModalAct())
  };
}

LotListComponent.propTypes = {
  lotList: PropTypes.object.isRequired,
  loadLotList: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  lotListSearchKeywords: PropTypes.string.isRequired,
  changeLotListSearchKeywords: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isLoadErrorModalOpen: PropTypes.bool,
  closeLotListErrorModal: PropTypes.func
};

export const LotList = connect(mapStateToProps, mapDispatchToProps)(LotListComponent);
