// https://www.npmjs.com/package/react-notification-system-redux
// https://github.com/igorprado/react-notification-system
export function buildNotificationContent({ message, title, position, uid, autoDismiss, ...rest }) {
  return {
    message,
    title: title || 'Notification',
    position: position || 'tc',
    uid: uid || null,
    autoDismiss: autoDismiss || 5,
    ...rest
  };
}
