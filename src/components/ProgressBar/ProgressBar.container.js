import ProgressBar from './ProgressBar';
import {connect} from 'react-redux';

const currentState = (state) => ({
    isVisible: state.derivative.data.isProcessing
})

export default connect(
    currentState
) (ProgressBar)