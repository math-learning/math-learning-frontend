import React, {Component} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './ProgressBar.css'

class ProgressBar extends Component {
    //TODO: refactor
    render () {
        let isVisible = this.props.isVisible
        let clazz = "progress" 
        let visible = isVisible ? "" : "not-visible";
        console.log(visible)
        clazz += " " + visible

        return (
            <div className={clazz}>
                <div className="spinner">
                    <CircularProgress/>
                    <div>Processing</div>
                </div>
            </div>
        )
    }
}

export default ProgressBar;