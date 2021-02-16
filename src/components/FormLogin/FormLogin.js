import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { TextCopy } from "../../components";
import { useFormik } from "formik";
import * as Yup from "yup";
import GoogleLogin from "react-google-login";
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function SignIn(props) {
    const classes = useStyles();
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePass, setErrorMessagePass] = useState("");
    const { handleOpenRegister, setOpenRegister } = props;
    const [viewEmail, setViewEmail] = useState(false);
    const [viewPass, setViewPass] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),

        onSubmit: (formData) => {
            //console.log(formData);
            modalSucess();
        },
    });
    const modalSucess = (response) => {
        setIsSaving(true)
        return swal({
            title: "Exelente",
            text: "El post se ha guardado correctamente",
            icon: "success",
            button: "Continuar",
        }).then(() => {
            //console.log(value);
            setIsSaving(false)
        });

    }
    const validateField = ({ name, value }) => {
        if (value !== null || value !== "") {
            if (name === 'email') {
                setViewEmail(true)
                setErrorMessageEmail(`Escriba su correo`);
            } else {
                setViewPass(true)
                setErrorMessagePass(`Escriba su contraseña`);
            }

        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (name === 'email') {
            setViewEmail(false)
        } else {
            setViewPass(false)
        }

        if (!value) {
            validateField({ name, value });
        }

    };

    const responseGoogle = (response) => {

        localStorage.setItem("user", JSON.stringify({
            idToken: response.tokenObj.id_token,
            name: response.profileObj.name,
            email: response.profileObj.email,
            img: response.profileObj.imageUrl
        }));
        window.location.reload(true);


    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Iniciar sesión
        </Typography>

                <GoogleLogin
                    clientId="282806600206-pdbfktcgg2qevormmivkvfjq61ugcf21.apps.googleusercontent.com"
                    buttonText="Iniciar sesión"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                />

                <form
                    className={classes.form}
                    noValidate
                    onSubmit={formik.handleSubmit}
                >
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Correo electrónico"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={formik.handleChange}
                        error={formik.errors.email}
                        onBlur={handleBlur}
                    />
                    {viewEmail && <div>
                        <p className="text-red-700 text-xs">{errorMessageEmail}</p>
                    </div>}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={formik.handleChange}
                        error={formik.errors.password}
                        onBlur={handleBlur}
                    />
                    {viewPass && <div>
                        <p className="text-red-700 text-xs">{errorMessagePass}</p>
                    </div>}
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Recordarme"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        disabled={isSaving}
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleBlur}
                    >
                        Ingresar
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Olvido su contraseña?
              </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={() => handleOpenRegister(true)}>
                                {"No tienes una cuenta? Registrate"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>

            <Box mt={8}>
                <TextCopy />
            </Box>
        </Container>
    );
}

function initialValues() {
    return {
        email: "",
        password: "",
    };
}

function validationSchema() {
    return {
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true),
    };
}
