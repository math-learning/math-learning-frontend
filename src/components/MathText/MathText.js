import React, { Component } from 'react';
import MathJax from 'react-mathjax2';
import PropTypes from 'prop-types';

import './MathText.css';

class MathText extends Component {
  constructor(props) {
    super(props);
    this.state = { content: props.content || '' };
  }

  componentWillReceiveProps(newProps) {
    if (this.state.content != newProps.content) {
      this.setState({ content: newProps.content });
    }
  }

  render() {
    return (
      <div id="math-text" className="Math-text" >
        <MathJax.Context input='ascii'>
          <div id="content">
            <MathJax.Node inline>{ this.state.content }</MathJax.Node>
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
