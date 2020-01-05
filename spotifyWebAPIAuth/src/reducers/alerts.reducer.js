export function alert(state = {}, action) {
    switch (action.type) {
        case 'SUCCESS':
            return {
                type: 'alert-success',
                message: action.message
            };
        case 'ERROR':
            return {
                type: 'alert-danger',
                message: action.message
            };
        case 'INFO':
            return {
                type: 'alert-info',
                message: action.message
            };
        case 'CLEAR':
            return {};
        default:
            return state
    }
}