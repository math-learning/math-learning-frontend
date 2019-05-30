import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MathText from "../MathText/MathText";
import MathQuill, { addStyles as addMathquillStyles } from 'react-mathquill'
import styles from './MathTextBox.css';

addMathquillStyles()

String.prototype.replaceAll = function(search, replacement) {
  var target = this;
  return target.split(search).join(replacement);
};

class MathTextBox extends Component {

  state = {
    rawLatex: ""
  }
  handleContentChange = (content) => {
    this.props.onContentChange(content);
  }

  onKeyPress = (event) => {
    if (event.key === 'Enter' && this.props.content !== ''){
      this.props.onEnter(this.props.content);
    }
  }

  cleanLatex = (latex) => {
    let clean = latex.replaceAll("\\left(","(");
    clean = clean.replaceAll("\\right)",")");
    clean = clean.replaceAll("\\ ","")
    return clean;
  }

  render() {
    return (
      <div
        id="math-box-text"
        className={styles.container}
        onKeyPress={this.onKeyPress}
        onClick={this.onClick}
      >
        {/* TODO: Fix and refactor */}
        <MathQuill
          latex={this.props.content} // Initial latex value for the input field
          onChange={(latex) => {
            this.setState({rawLatex: latex})
            this.handleContentChange(this.cleanLatex(latex))
          }}
        />
        
        {/* <div id="text-box" className={styles.textBoxContainer}>
          <input
            type="text"
            autoFocus={true}
            className={styles.textBox}
            value={this.props.content}
            onChange={(e) => this.handleContentChange(e.target.value)}
          />
        </div>

        <MathText id="content" content={this.props.content} /> */}
      </div>
    );
  }
}

MathText.propTypes = {
  content: PropTypes.string,
  onContentChange: PropTypes.func,
  onEnter: PropTypes.func
};

export default MathTextBox;
