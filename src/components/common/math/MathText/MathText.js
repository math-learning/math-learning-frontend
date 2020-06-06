import React from 'react';
import PropTypes from 'prop-types';
import MathJax from 'react-mathjax';
import { MQ } from './mathquill-loader';
import * as latexUtils from '../../../../utils/latexUtils';

class MathText extends React.Component {
  constructor(props) {
    super(props);

    this.element = null;
    this.mathField = null;

    // MathJax apparently fire 4 edit events on startup.
    this.ignoreEditEvents = 4;
  }

  componentDidMount() {
    const { className, renderMethod = 'mathquill' } = this.props;

    if (renderMethod === 'mathquill') {
      this.mathField = MQ.StaticMath(this.element);
      if (className) {
        this.element.classList.add(className);
      }
    }
  }

  componentDidUpdate() {
    const { renderMethod = 'mathquill' } = this.props;

    if (renderMethod === 'mathquill') {
      this.mathField = MQ.StaticMath(this.element);
    }
  }

  render() {
    const {
      id, content, className, renderMethod = 'mathquill'
    } = this.props;

    if (renderMethod === 'mathquill') {
      return (
        <p id={id} ref={(x) => { this.element = x; }}>
          {latexUtils.cleanExpression(content, true)}
        </p>
      );
    }

    return (
      <MathJax.Provider id={id} className={className}>
        <MathJax.Node formula={latexUtils.cleanExpression(content, false)} />
      </MathJax.Provider>
    );
  }
}

MathText.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  content: PropTypes.string,
};

export default MathText;
