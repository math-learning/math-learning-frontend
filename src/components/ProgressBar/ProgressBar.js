import React, {Component} from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import styles from './ProgressBar.module.sass'

class ProgressBar extends Component {
    //TODO: refactor
    render () {
        let isVisible = this.props.isVisible
        let clazz = styles.progress
        let visible = isVisible ? "" : styles.notVisible;
        clazz += " " + visible

        return (
            <div className={clazz}>
                <div className={styles.spinner}>
                    <CircularProgress/>
                </div>
            </div>
        )
    }
}

export default ProgressBar;