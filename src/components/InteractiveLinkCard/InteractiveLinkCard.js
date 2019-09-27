import React, { Component } from "react";
import styles from '../../App.module.sass'
import {Link} from 'react-router-dom'
import { Card } from "@material-ui/core";

export default class InteractiveLinkCard extends Component {
  constructor(props) {
    super(props);
    this.state = { raised: false }
  }

  onMouseEnter = () => {
    this.setState({ ...this.state, raised: true });
  };

  onMouseLeave = () => {
    this.setState({ ...this.state, raised: false });
  };

  render() {
    const { raised } = this.state;
    let { path, className } = this.props;
    
    className = className !== undefined && className !== null ? className : "";
    return (
      <Link className={styles.linkWithoutStyles} to={{ pathname: path }}>
        <Card
          className={className}
          raised={raised}
          onMouseEnter={this.onMouseEnter.bind(this)}
          onMouseLeave={this.onMouseLeave.bind(this)}
        >
          {this.props.children}

        </Card>
      </Link>
    )
  }
}