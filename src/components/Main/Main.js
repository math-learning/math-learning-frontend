import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import Footer from '../Footer'
import image from './content.jpg';

const useStyles = makeStyles(() => ({
  main: {
    display: 'flex',
    flexFlow: 'column'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px'
  },
  headerTitle: {
    fontSize: '20px',
    paddingLeft: '30px'
  },
  signUpButton: {
    color: '#ffffff',
    marginRight: '30px',
    backgroundColor: '#62A5A5'
  },
  loginButton: {
    marginRight: '30px',
    color: '#ffffff'
  },
  content: {
    display: 'flex',
    minHeight: '450px',
    textAlign: 'center',
    background: `url(${image})`,
    backgroundSize: 'cover'
  },
  imageContent: {
    alignItems: 'center',
    padding: '100px'
  },
  imageContentText: {
    fontSize: '45px',
    textAlign: 'center',
    margin: '0',
    marginBottom: '30px'
  },
  imageContentSignUp: {
    color: '#ffffff',
    backgroundColor: '#62A5A5'
  },
  footer: {
    display: 'flex',
    fontSize: '20px',
    textAlign: 'center',
    margin: '0'
  }
}));

export default function Main() {
  const classes = useStyles();

  const footer = () => {
    return (
      <p>
        Pricing ⋅ Contact ⋅ Blog ⋅ Docs ⋅ Terms and Privacy ⋅ Public GitHub
        <br/>
        Copyright © Pivit Inc. 2019. All Rights Reserved
      </p>
    )
  }
  
  return (
    <div data-test-id="main-page" className={classes.main}>
      <div data-test-id="main-page-header" className={classes.header}>
        <span className={classes.headerTitle}>Math Learning</span>

        <div className={classes.loginButtons}>
          <Button className={classes.loginButton}>Login</Button>
          <Button size="medium" className={classes.signUpButton}>Sign up</Button>
        </div>
      </div>

      <div className={classes.content}>
        <div className={classes.imageContent}>
          <p className={classes.imageContentText}>
            Aprender matemática<br/>
            nunca fue tan fácil
          </p>
          <Button size="large" className={classes.imageContentSignUp}>Sign up</Button>
        </div>
      </div>

      <div className={classes.footer}>
        <Footer node={footer()}/>
      </div>
    </div>
  );
}

