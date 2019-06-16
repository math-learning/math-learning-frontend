import React, { Component } from 'react';
import MathJax from 'react-mathjax2';
import PropTypes from 'prop-types';

import styles from './MathText.css';

class MathText extends Component {

  render() {
    return (
      <div id="math-text" className="Math-text" >
        <MathJax.Context input='ascii'>
          <div id="content">
            <MathJax.Node inline>{ this.props.content }</MathJax.Node>
          </div>
        </MathJax.Context>
      </div>
    );
  }
}

MathText.propTypes = {
  content: PropTypes.string
};

export default MathText;
