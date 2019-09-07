import React from 'react';
import { Typography, Container } from '@material-ui/core';
import styles from './Footer.module.sass'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <Container maxWidth="md">
                <div className={styles.content}>
                    <p>
                        Pricing ⋅ Contact ⋅ Blog ⋅ Docs ⋅ Terms and Privacy ⋅ Public GitHub
                        <br/>
                        Copyright © Pivit Inc. 2019. All Rights Reserved
                    </p>
                </div>
            </Container>
        </footer>
    )
}
