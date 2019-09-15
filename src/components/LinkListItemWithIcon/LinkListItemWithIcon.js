import React, { Component } from 'react'
import styles from '../../App.module.sass'
import {Link} from 'react-router-dom'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'


export default class LinkListItemWithIcon extends Component {
  render() {
    const {path, text, icon, key} = this.props
    return (
      <Link className={styles.linkWithoutStyles} to={{pathname: path}}>
        <ListItem button key={key}>
          <ListItemIcon>
            {' '}
            {icon}
            {' '}
          </ListItemIcon>
          <ListItemText primary={text} className={styles.textCenter} />
        </ListItem>
      </Link>
    )
  }
}
