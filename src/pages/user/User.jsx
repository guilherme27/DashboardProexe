import React from 'react'

import UserForm from "../../components/UserForm/UserForm"
import styles from './styles';

export default function Home() {

    return (
        <div style={styles.container}>
            <UserForm></UserForm>
        </div>
    );
}