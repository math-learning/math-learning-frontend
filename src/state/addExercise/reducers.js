import * as types from './actionTypes'

const initialState = {
    data: {
        exercise: "",
        result: ""
    }
}


export default function reduceres(state = initialState, action) {
    switch (action.type) {
        case types.ADD_EXERCISE_ADD_EXERCISE:
            return state
        case types.ADD_EXERCISE_EXPRESSION_CHANGE:
            return state
        case types.ADD_EXERCISE_GET_RESULT:
            return {
                ...state,
                data: {
                    ...state.data,
                    result: action.result
                }
            }
        case types.ADD_EXERCISE_RESULT_CHANGE:
            return state
        default:
            return state
    }
}