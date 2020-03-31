import React, { useState, useCallback, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import SignUp from './SignUp'
import AssignmentIcon from '@material-ui/icons/Assignment';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import { clearErrors } from '../../actions/errorActions';
import {
    useHistory
} from "react-router-dom";
import { login } from '../../actions/authActions';




function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    }

}));



function SignIn(props) {
    const classes = useStyles();
    const [modal, setModal] = useState(false);
    const [msg, setMsg] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleToggle = useCallback(() => {
        // Clear errors
        props.clearErrors();
        setModal(!modal);
    }, [props, modal]);
    let history = useHistory();

    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);

    const handleOnSubmit = (e) => {
        e.preventDefault();

        const user = { email, password };

        // Attempt to login
        props.login(user);
    };

    useEffect(() => {
        // Check for register error
        if (props.error.id === 'REGISTER_FAIL') {
            setMsg(props.error.msg.msg);
        }

        else if (props.error.id === 'LOGIN_FAIL') {
            setMsg(props.error.msg.msg);
        } else {
            setMsg(null);
        }

        // If authenticated, close modal

        if (props.isAuthenticated) {
            if (modal)
                handleToggle();
            props.clearErrors();
            history.push('/profile')

        }

    }, [props.error, modal, handleToggle, history]);



    return (
        <Container component="main" maxWidth="xs" >
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AssignmentIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Welcom To Bug Tracker
                    </Typography>
                {msg ? <Alert severity="error">{msg}</Alert> : null}
                <form className={classes.form} onSubmit={handleOnSubmit} noValidate>
                    <TextField

                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChangeEmail}

                    />
                    <TextField

                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChangePassword}

                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={props.handleSelect.bind(this, 0)}
                    >
                        Sign In
                        </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="/bugs" variant="body2" onClick={props.handleSelect.bind(this, 1)}>
                                {"Guest Link"}
                            </Link>
                        </Grid>

                        <Grid item>
                            <Link href="#" variant="body2" onClick={handleToggle}>
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>
                <Copyright />
            </Box>
            <SignUp
                open={modal}
                onClose={handleToggle}
                msg={msg}
                handleSelect={props.handleSelect}
            />
        </Container >
    );
}


const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, { login, clearErrors })(
    SignIn
);