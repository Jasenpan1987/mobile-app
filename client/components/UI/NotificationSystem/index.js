import React from 'react';
import PropTypes from 'prop-types';
import Notifications from 'react-notification-system-redux';

const NotificationSystemComponent = ({ notifications }) => {
  return (
    <Notifications
      notifications={notifications}
    />
  );
};

NotificationSystemComponent.propTypes = {
  notifications: PropTypes.array
};

export const NotificationSystem = NotificationSystemComponent;
