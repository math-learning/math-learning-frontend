import React, {Component} from 'react';
import styles from './Footer.css'

class Footer extends Component {
    render() {
        return (
            <div className="footer">
                <div className="primary-section">
                    This is the footer main info
                </div>
                <div className="secondary-section">
                    This is the footer secondary info
                </div>
            </div>
        )
    }
}

export default Footer;