import React from 'react'

import Table from "../../components/Table/Table"
import styles from './styles';

const Home = () => {

    return (
        <div style={styles.container}>
            <h2>Dashboard</h2>
            <Table></Table>
        </div>
    );
}

export default Home;