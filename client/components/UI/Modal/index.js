import React from 'react';
import PropTypes from 'prop-types';
import ReactModal from 'react-modal';

import { Style } from '../StyleComponents';
import Header from './Header';
import Body from './Body';
import Footer from './Footer';

import localStyles from './styles.scss';

const overlayCls = {
  base: localStyles.overlay
};

const contentCls = {
  base: localStyles['modal-v-middle']
};

const ModalComponent = ({ children, isOpen, onRequestClose, onAfterOpen, style, contentLabel, height, width }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterOpen={onAfterOpen}
      style={style}
      overlayClassName={overlayCls}
      className={contentCls}
      contentLabel={contentLabel}
    >
      <Style
        selector={`.${localStyles['modal-v-middle']}`}
        styles={`${height && `height: ${height};`} ${width && `width: ${width};`}`}
      />
      <div className={localStyles['modal-inner']}>
        {children}
      </div>
    </ReactModal>
  );
};
ModalComponent.propTypes = {
  children: PropTypes.any.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
  onAfterOpen: PropTypes.func,
  style: PropTypes.object,
  contentLabel: PropTypes.string,
  height: PropTypes.string,
  width: PropTypes.string
};

export const Modal = ModalComponent;
export const ModalHeader = Header;
export const ModalBody = Body;
export const ModalFooter = Footer;
