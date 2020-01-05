export const register = (state = {}, action) => {

    switch(action.type) {
        case 'REGISTER_REQUEST':
            return { registering: true };

        case 'REGISTER_SUCCESS':
            return { registered: true };

        case 'REGISTER_FAILURE':
            return { registered: false };

        default: 
            return state;
    }

}