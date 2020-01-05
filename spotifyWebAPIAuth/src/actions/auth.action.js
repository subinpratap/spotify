import { mocky, restApi } from "../apis/calls";
import { alertActions } from "./alert.action";
import history from '../history';

/* export const createSession = () => async dispatch => {
    const response = await restApi.get('/5ddcdf63340000b517eae51c');

    dispatch({ type: 'CREATE_SESSION', payload: response.data });
}; */

export const login = (username, password) => async dispatch => {
    dispatch(request(username));

    await restApi.get(`/users?username=${username}&password=${password}`)
               .then(response => {
                    const resp = (response.data.length > 0) && response.data[0];
                    if(resp) {
                        const { username } = resp;
                        dispatch(success(username));
                        history.push('/home');
                        dispatch(alertActions.success("You've logged in successfully")); //for showing banner message
                    } else {
                        dispatch(failure("Invalid credentials"));
                        dispatch(alertActions.error("Invalid credentials")); //for showing banner message
                    }
                    
                })
               .catch(error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString())); //for showing banner message
                })

    function request(user) { return { type: 'LOGIN_REQUEST', user } }
    function success(user) { return { type: 'LOGIN_SUCCESS', user } }
    function failure(error) { return { type: 'LOGIN_FAILURE', error } }
};

export const register = (username, password) => async dispatch => {
    dispatch({ type: 'REGISTER_REQUEST' } );

    try {
        let checkUsernameAvailablity = await restApi.get(`/users?username=${username}`);
        checkUsernameAvailablity = checkUsernameAvailablity.data;

        if(checkUsernameAvailablity.length == 0 ) {
            await restApi.post('/users', { username, password })
                .then(response => {
                    console.log(response);
                    dispatch({ type: 'REGISTER_SUCCESS' });
                    history.push('/login');
                    dispatch(alertActions.success("You've been registered successfully. Please login using your credentials"));
                })
                .catch(error => {
                    dispatch({ type: 'REGISTER_FAILURE' });
                    dispatch(alertActions.error(error.toString()));
                })
        } else {
            dispatch({ type: 'REGISTER_FAILURE' });
            dispatch(alertActions.error("Username already exists. Please try with a different username."));
        }
    }

    catch(e) {
        console.log(e);
    }          
};

export const logout = () => async dispatch => {
    localStorage.removeItem('user');
    dispatch(alertActions.info("You've been logged out successfully"));
    dispatch({ type: 'LOGOUT' });
    history.push('/login');
};