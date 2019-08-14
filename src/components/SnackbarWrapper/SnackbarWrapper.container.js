import {connect} from 'react-redux';
import SnackBarWrapper from './SnackbarWrapper'
import * as actions from '../../state/snackbar/actions'

const currentState = (state) => ({
    variant: state.snackbar.data.variant,
    message: state.snackbar.data.message,
    open: state.snackbar.data.open,
    autoHideDuration: state.snackbar.data.autoHideDuration
})

const currentActions = (dispatch) => {
    handleClose: dispatch(actions.handleClose())
}


export default connect(
    currentState,
    currentActions
) (SnackBarWrapper)