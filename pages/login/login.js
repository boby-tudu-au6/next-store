import { useState } from 'react';
import { Button, TextField, Typography, InputBase } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from 'next/link';
import Head from 'components/Head';
import Snackbar from 'components/Snackbar';
import axios from 'axios';
import Router from 'next/router';
import cookie from 'js-cookie'

const useStyles = makeStyles(() => {
    return {
        root: {
            height: '85vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'right'
        },
        form: {
            width: '40%',
            margin: 'auto',
            padding: 24,
            boxShadow: '1px 1px 4px lightgray',
            borderRadius: 8
        },
        input: {
            marginBottom: 8
        },
        font: {
            margin: 12,
            textAlign: 'center'
        },
        inputBase: {
            border: '1px solid black'
        },
        link: {
            margin: 8
        }
    }
})

const Login = () => {
    const classes = useStyles();
    const [state, setstate] = useState({
        severity: 'success',
        title: '',
        open: false
    })
    const handleSubmit = async e => {
        e.preventDefault();
        const { email, password } = e.target;
        try {
            const { data } = await axios.post('/api/user/login', {
                email: email.value,
                password: password.value
            });
            
            setstate({ severity: 'success', open: true, title: 'Login success' });
            cookie.set('user', data)
            setTimeout(() => Router.push('/'), 2000)
        } catch (error) {
            console.log(error.response)
            if (typeof error.response.data === typeof 'sdfsdf') return setstate({ severity: 'error', open: true, title: error.response.data })
            return setstate({ severity: 'error', open: true, title: error.message})
        }
    }

    return (
        <div className={classes.root}>
            <Head title="Login" />
            <Snackbar {...state} />
            <form onSubmit={handleSubmit} className={classes.form} type="post">
                <Typography variant="h2" className={classes.font}>Login</Typography>
                <TextField size="small" fullWidth className={classes.input} name="email" type="email" label="Enter Email" />
                <TextField size="small" fullWidth className={classes.input} name="password" type="password" label="Enter Email" />
                <Button fullWidth type="submit" className={classes.input} variant="contained" color="primary">Login</Button>
                <Link href="/register">
                    <a>Don't have an account? Click here.</a>
                </Link>
            </form>
        </div>
    );
}
 
export default Login;