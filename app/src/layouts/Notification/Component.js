import {notification, message as AntMessage} from 'antd';

export const pushNotification = (type, message = '', description = '') => {
    const types = ['success', 'info', 'warning', 'error']
    type        = types.indexOf(type) === -1 ? 'info' : type;

    notification[type]({
        message: message,
        description: description,
    });
};

export const pushMessageSuccess = () => {
    AntMessage.success('Successfully');
};

export const pushMessageError = () => {
    AntMessage.error('Sorry, something went wrong.');
};

export const pushMessageLoading = () => {
    const hide = AntMessage.loading('Loading...', 0);
    // Dismiss manually and asynchronously
    setTimeout(hide, 500);
}

export default pushNotification