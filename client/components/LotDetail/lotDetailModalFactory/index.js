import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import localStyles from './styles.scss';
import globalStyles from '../../../shared/styles/global.scss';

import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../components/UI/Modal';

const lotDetailErrorModalFactory = (title, content) => {
  const LotDetailErrorModal = ({ isOpen, closeModal }) => {
    return (
      <Modal isOpen={isOpen}>
        <ModalHeader className={localStyles.header}>
          <h3>{title}</h3>
        </ModalHeader>
        <ModalBody className={localStyles.body}>
          <h5>{content}</h5>
        </ModalBody>
        <ModalFooter className={localStyles.footer}>
          <div>
            <button className={classnames(globalStyles.btn, globalStyles['btn-normal'])} onClick={closeModal}>Close</button>
          </div>
        </ModalFooter>
      </Modal>
    );
  };

  LotDetailErrorModal.propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    title: PropTypes.string,
    content: PropTypes.string
  };

  return LotDetailErrorModal;
};

export { lotDetailErrorModalFactory };
