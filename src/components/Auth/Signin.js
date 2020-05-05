import React, { useState, Fragment } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Grid, Box, InputAdornment, Button, TextField, Card, CardContent, Divider, Typography } from "@material-ui/core";
import { Email, VpnKey } from "@material-ui/icons";
import { useFirebase } from "react-redux-firebase";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import languages from "../../languages";

var { get } = require("lodash");

const useStyles = makeStyles(theme => ({
    errorMessage: {
        color: theme.palette.error.main
    },
    marginBot: {
        marginBottom: theme.spacing(2)
    },
    marginTop: {
        marginTop: theme.spacing(2)
    },
    orBox: {
        margin: theme.spacing(3, 0)
    },
    smallDivider: {
        width: 32
    },
    link: {
        textDecoration: "none",
        color: "inherit",
        opacity: 0.7
    },
    loginGoogle: {
        backgroundColor: theme.palette.error.dark
    },
    cardContent: {
        color: theme.palette.primary.main,
        padding: theme.spacing(16, 4, 4, 4),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(4, 2, 4, 2)
        }
    },
    progress: {
        marginTop: theme.spacing(2)
    },
    progresContainer: {
        textAlign: "center"
    }
}));

const Signin = () => {
    const classes = useStyles();

    const currentLang = useSelector(state => state.app.lang);
    const lang = languages[currentLang];

    const firebase = useFirebase();

    const [errorMessage, setErrorMessage] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    function handleClick() {
        setErrorMessage(null);
        setLoading(true);
        firebaseLogin();
    }
    async function firebaseLogin() {
        try {
            const credential = await firebase.login({
                email: values.email,
                password: values.password
            });
        } catch (e) {
            console.log(e);
            setErrorMessage(e.message);
            setLoading(false);
        }
    }

    const [values, setValues] = React.useState({
        email: "",
        password: ""
    });

    const handleKeyUp = event => {
        if (event.keyCode === 13 && isFormValid()) {
            handleClick();
        }
    };
    const handleChange = prop => event => {
        setValues({ ...values, [prop]: event.target.value });
    };

    function validateEmail() {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(values.email).toLowerCase());
    }

    function isFormValid() {
        return validateEmail() && values.password.length > 4;
    }

    return (
        <CardContent className={classes.cardContent}>
            <Box mb={3}>
                <Typography align="center" variant="h6">
                    {get(lang, "LOGIN_ACCOUNT", "")}
                </Typography>
            </Box>

            <TextField
                label={get(lang, "EMAIL_TXT", "")}
                name="email"
                fullWidth
                value={values.email}
                onChange={handleChange("email")}
                className={classes.marginBot}
                onKeyUp={handleKeyUp}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Email />
                        </InputAdornment>
                    )
                }}
                variant="outlined"
            />
            <TextField
                label={get(lang, "PASSWORD", "")}
                name="password"
                fullWidth
                type="password"
                className={classes.marginBot}
                value={values.password}
                onChange={handleChange("password")}
                onKeyUp={handleKeyUp}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <VpnKey />
                        </InputAdornment>
                    )
                }}
                variant="outlined"
            />

            {loading ? (
                <div className={classes.progresContainer}>
                    <CircularProgress size={30} className={classes.progress} />
                </div>
            ) : (
                <Fragment>
                    {errorMessage ? <Typography color="secondary">{errorMessage}</Typography> : null}
                    <Button
                        fullWidth
                        variant="contained"
                        color="secondary"
                        disabled={!isFormValid()}
                        onClick={handleClick}
                        className={classes.marginTop}
                    >
                        {get(lang, "SIGNIN", "")}
                    </Button>
                </Fragment>
            )}
        </CardContent>
    );
};

export default Signin;
