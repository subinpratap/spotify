export const alertActions = {
    success,
    error,
    info,
    clear
};

function success(message) {
    return { type: 'SUCCESS', message };
}

function error(message) {
    return { type: 'ERROR', message };
}
function info(message) {
    return { type: 'INFO', message };
}

function clear() {
    console.log('clear');
    return { type: 'CLEAR' };
}