import {connect} from 'react-redux'
import AddExercisePage from './AddExercisePage'

const currentState = (state) => {
    
}

const currentActions = (dispatch) => ({
    handleExpressionChange: (payload) => dispatch(actions.handleAddExpressionChange(payload)),
    handleResultChange: (payload) => dispatch(actions.handleAddResultChange(payload)),
    otehr: (payload) => dispatch(actions.handleExpressionChange(payload)),
    another: (payload) => dispatch(actions.handleExpressionChange(payload))
})

export default connect(
    null
) (AddExercisePage)