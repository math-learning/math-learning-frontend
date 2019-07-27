import DerivativePage from './DerivativePage'
import {connect} from 'react-redux'

const currentState = (state,{problemIndex}) => ({
    problemIndex,
    inputProblem: state.derivative.data.exercises[problemIndex].input, 
    result: state.derivative.data.exercises[problemIndex].result,
})

export default connect(
    currentState,
    null
) (DerivativePage);