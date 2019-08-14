import * as types from './actionTypes';

const initialState = {
    data: {
        variant: "info",
        message: "",
        open: false,
        autoHideDuration: 3000
    }
}

export default function reducers(state = initialState, action) {

    switch (action.type) {
        case types.CLOSE_SNACKBAR:
            return {
                ...state,
                data: {
                    ...state.data,
                    open: false
                }
            }
        case types.SHOW_ERROR:
            return {
                ...state,
                data: {
                    ...state.data,
                    open: true,
                    message: action.message,
                    variant: "error"
                }
            }
        
    }
}