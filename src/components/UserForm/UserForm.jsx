import React, { useState, useEffect } from 'react'
import validator from 'validator';

import UserService from '../../services/UserService';
import { Box } from '@mui/system';
import { Button, Grid, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './styles';


export default function Home() {
    const params = useParams();
    const navigate = useNavigate();

    
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [city, setCity] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState({});
    
    useEffect(() => {
        if (params.id) {
            const user = UserService().getUsers().find((user) => parseInt(params.id) === user.id);
            setId(Number(user.id));
            setName(user.name);
            setUsername(user.username);
            setCity(user.city);
            setEmail(user.email);
        }
    }, [params]);

    const saveUser = () => {
        const users = UserService().getUsers();

        let validationErrors = {};

        if (validator.isEmpty(name)) {
            validationErrors = { ...validationErrors, name: 'Is Required!' };
        }

        if (!validator.isEmail(email)) {
            validationErrors = { ...validationErrors, email: 'Is Invalid!' };
        }

        if (validator.isEmpty(email)) {
            validationErrors = { ...validationErrors, email: 'Is Required!' };
        }

        const isExists = users.find((user) => Number(user.id) === Number(id));
        if (isExists) {
            validationErrors = { ...validationErrors, id: 'This id its already in use!' };
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        };

        let newUsers = [...users];
        if (params.id) {
            newUsers = users.filter((user) => Number(params.id) !== Number(user.id));
        }

        newUsers.push({ id: Number(id), name, username, city, email });
        newUsers.sort((a, b) => Number(a.id) - Number(b.id))
        UserService().setUsers(newUsers);

        navigate('/');
    }

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>User</h2>
                <Box component="form">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                fullWidth
                                label="Id"
                                type="number"
                                id="outlined-basic"
                                value={id}
                                onChange={(e) => setId(e.target.value)}
                                size="small"
                                error={errors?.id}
                                helperText={errors?.id}
                            />
                        </Grid>
                        <Grid item xs={12} md={9}>
                            <TextField
                                fullWidth
                                error={errors?.name}
                                required
                                label="Name"
                                id="outlined-basic"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                size="small"
                                helperText={errors?.name}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Username"
                                id="outlined-basic"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="City"
                                id="outlined-basic"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                size="small"
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <TextField
                                fullWidth
                                required
                                error={errors?.email}
                                label="Email"
                                id="outlined-basic"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                size="small"
                                helperText={errors?.email}
                            />
                        </Grid>
                        <Grid container justifyContent={'flex-end'} spacing={2} style={styles.wrapperButtons}>
                            <Grid item xs={12} md={1}>
                                <Button variant="outlined" onClick={() => navigate('/')} fullWidth> Cancel</Button>
                            </Grid>
                            <Grid item xs={12} md={1}>
                                <Button variant="contained" color="success" onClick={saveUser} fullWidth> Save</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
}