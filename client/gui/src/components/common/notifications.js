import { notification } from 'antd';

export const openNotification = (type, message, duration) => {
  notification[type]({
    message: message,
    top: 85,
    duration: duration,
    placement: 'centerTop'
  });
};
