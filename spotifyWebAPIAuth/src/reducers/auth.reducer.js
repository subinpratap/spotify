
let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { 'loggedIn': true, 'user': user } : {};

export function auth(state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                loggingIn: true,
                user: action.user
            };

        case 'LOGIN_SUCCESS':
            localStorage.setItem('user', JSON.stringify(action.user));
            return {
                loggedIn: true,
                user: action.user
            };

        case 'LOGIN_FAILURE':
            return {};

        case 'LOGOUT':
            return {};

        default:
            return state
    }
}