import React from 'react';
import PropTypes from 'prop-types';
import localStyles from './styles.scss';
import globalStyles from '../../styles/global.scss';
import classnames from 'classnames';

import { Modal, ModalBody, ModalFooter, ModalHeader } from '../../../components/UI/Modal';

const SignItErrorModalComponent = ({ isOpen, errors, closeModal }) => {
  return (
    <Modal isOpen={isOpen}>
      <ModalHeader className={localStyles.header}>
        <h3>SignIT Error</h3>
      </ModalHeader>
      <ModalBody className={localStyles.body}>
        <h5>Please Fix The Following Errors: </h5>
        <div>
          <ol>
            {errors.map((error, idx) => {
              return <li key={`error-${idx}`}>{error}</li>;
            })}
          </ol>
        </div>
      </ModalBody>
      <ModalFooter className={localStyles.footer}>
        <div>
          <button className={classnames(globalStyles.btn, globalStyles['btn-normal'])} onClick={closeModal}>Close</button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

SignItErrorModalComponent.propTypes = {
  isOpen: PropTypes.bool,
  errors: PropTypes.array,
  closeModal: PropTypes.func
};

export const SignItErrorModal = SignItErrorModalComponent;
