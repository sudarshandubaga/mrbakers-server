const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
};

export default function authReducer(state = initialState, action: any) {
    const { type, payload } = action;

    switch (type) {
        case "LOGIN_SUCCESS":
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
            };

        default:
            return state;
    }
}
