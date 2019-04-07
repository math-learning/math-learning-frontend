import React, { Component } from 'react';
import MathJax from 'react-mathjax2';
import PropTypes from 'prop-types';

// import './MathText.css';

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
      <div>
        <MathJax.Context input='ascii'>
          <div>
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
