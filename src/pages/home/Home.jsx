import React, { useEffect, useState } from 'react'

import UpdateService from "../../services/UpdateService"
import Table from "./../../components/Table/Table"

const Home = () => {

    return (
        <div className="">
            <h2>Dashboard</h2>
            <Table></Table>
        </div>
    );
}

export default Home;