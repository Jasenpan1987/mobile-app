import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './LotLayout.scss';
import { Link } from 'react-router';
import { HorizontalTab, TabItem } from '../../UI/Tab';
import { Icon } from '../../UI/Icon';
import { connect } from 'react-redux';

const LotLayoutComponent = ({ children, params: { projectId, lotId }, location: { pathname }, currentLotDetail }) => {
  const isPrimaryTabActive = /lots\/\d+\/primary?$/.test(pathname);
  // const isDocumentsTabActive = /lots\/\d+\/documents?$/.test(pathname);
  return (
    <div>
      <div className={styles.container}>
        <div>
          <Link to={`${ROUTE_BASE}/projects/${projectId}/lots/`}>
            <span><Icon icon={'arrow-left'} />Lot {currentLotDetail.primaryDetail && currentLotDetail.primaryDetail.number}</span>
          </Link>
        </div>
        <div className={classnames('pull-right', styles.tab)}>
          <HorizontalTab height={'3rem'} >
            <TabItem className={styles.default} activeClassName={styles.active} active={isPrimaryTabActive}>
              <div>
                <Link className={'btn'} to={`${ROUTE_BASE}/projects/${projectId}/lots/${lotId}/primary`}>Lot Detail</Link>
              </div>
            </TabItem>
            {/* <TabItem className={styles.default} activeClassName={styles.active} active={isDocumentsTabActive}>
              <div>
                <Link className={'btn'} to={`/projects/${projectId}/lots/${lotId}/documents`}>Documents</Link>
              </div>
            </TabItem>
            <TabItem className={styles.default} activeClassName={styles.active} active={isDocumentsTabActive}>
              <div>
                <Link className={'btn'} to={`/projects/${projectId}/lots/${lotId}/documents`}>Notes</Link>
              </div>
            </TabItem>
            <TabItem className={styles.default} activeClassName={styles.active} active={isDocumentsTabActive}>
              <div>
                <Link className={'btn'} to={`/projects/${projectId}/lots/${lotId}/documents`}>AuditLog</Link>
              </div>
            </TabItem> */}
          </HorizontalTab>
        </div>
      </div>
      {children}
    </div>
  );
};

LotLayoutComponent.propTypes = {
  children: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  currentLotDetail: PropTypes.object
};

function mapStateToProps(state) {
  return {
    currentLotDetail: state.currentLotDetail
  };
}

export const LotLayout = connect(mapStateToProps)(LotLayoutComponent);
