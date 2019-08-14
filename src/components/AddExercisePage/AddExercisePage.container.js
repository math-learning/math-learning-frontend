import {connect} from 'react-redux'
import * as actions from '../../state/addExercise/actions'
import * as snackBarActions from '../../state/snackbar/actions'
import AddExercisePage from './AddExercisePage'

const currentState = (state) => ({
    expression: state.addExercise.data.expression,
    result: state.addExercise.data.result,
})

const currentActions = (dispatch) => ({
    handleExpressionChange: (payload) => dispatch(actions.handleAddExpressionChange(payload)),
    handleResultChange: (payload) => dispatch(actions.handleAddResultChange(payload)),
    handleGetResult: (payload) => dispatch(actions.handleGetResult(payload)),
    handleAddExercise: (payload) => dispatch(actions.handleAddExercise(payload)),
    showError: (payload) => dispatch(snackBarActions.showError(payload))
})

export default connect(
    currentState,
    currentActions
) (AddExercisePage)