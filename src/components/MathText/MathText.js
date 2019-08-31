import React from 'react'
import PropTypes from 'prop-types'
import { MQ } from './mathquill-loader'

class MathText extends React.Component {
  constructor(props) {
    super(props)

    this.element = null
    this.mathField = null

    // MathJax apparently fire 4 edit events on startup.
    this.ignoreEditEvents = 4
  }

  componentDidMount() {
    this.mathField = MQ.StaticMath(this.element);
    if (this.props.className) {
      this.element.classList.add(this.props.className)
    }
  }

  componentDidUpdate() {
    this.mathField = MQ.StaticMath(this.element);
  }

  render() {
    return (
      <div
        ref={x => {
          this.element = x
        }}
      >
        {this.props.content}
      </div>
    )
  }
}

MathText.propTypes = {
  content: PropTypes.string
}

export default MathText