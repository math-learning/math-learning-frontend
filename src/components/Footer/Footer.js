import React from 'react';
import { Typography, Container } from '@material-ui/core';
import styles from './Footer.module.sass'



export default function Footer() {

    return (
        <footer className={styles.footer}>
            <Container maxWidth="md">
                <Typography variant="h6" align="center" gutterBottom color="textPrimary">
                    Footer
                </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
            </Container>   
        </footer>
    )
    
}