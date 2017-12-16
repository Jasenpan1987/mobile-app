import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import localStyles from './styles.scss';
import globalStyles from '../../../shared/styles/global.scss';

import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../components/UI/Modal';

const DashboardErrorModal = ({ isOpen, closeModal }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader className={classnames(localStyles.header, 'theme-border-bottom-lightest')}>
        <h3>Unexpected server error</h3>
      </ModalHeader>
      <ModalBody className={localStyles.body}>
        <h5>Unable to load lot data due to an expected server error, please try again later.</h5>
      </ModalBody>
      <ModalFooter className={localStyles.footer}>
        <div>
          <button className={classnames(globalStyles.btn, globalStyles['btn-normal'])} onClick={closeModal}>Close</button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

DashboardErrorModal.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func
};

export { DashboardErrorModal };
