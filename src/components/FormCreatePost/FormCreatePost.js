import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import { post, put } from "../Api/AsyncHttpRequest"
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

export default function CreatePost(props) {

    const classes = useStyles();
    const urlApi = `${process.env.REACT_APP_API_ALL_POSTS}/posts`;
    const [errorMessageEmail, setErrorMessageEmail] = useState("");
    const [errorMessagePass, setErrorMessagePass] = useState("");
    const [viewEmail, setViewEmail] = useState(false);
    const [viewPass, setViewPass] = useState(false);
    const { dataPost, openUpdatepost } = props;

    const formik = useFormik({
        initialValues: initialValues(),
        onSubmit: (formData) => {
            openUpdatepost ? put(`${urlApi}/${dataPost.id}`, dataPost) : post(urlApi, formData, modalSucess)

        },
    });
    const modalSucess = (response) => {

        return swal({
            title: "Exelente",
            text: "El post se ha guardado correctamente",
            icon: "success",
            button: "Continuar",
        }).then((value) => {
            console.log(value);
        });

    }
    const validateField = ({ name, value }) => {
        if (value !== null || value !== "") {
            if (name === 'title') {
                setViewEmail(true)
                setErrorMessageEmail(`Escriba un titulo`);
            } else if (name === 'post') {
                setViewPass(true)
                setErrorMessagePass(`Escriba un post`);
            }

        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            setViewEmail(false)
        } else if (name === 'post') {
            setViewPass(false)
        }

        if (!value) {
            validateField({ name, value });
        }

    };


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>

                <Typography component="h1" variant="h5">
                    Crear nuevo post
                </Typography>

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
                        id="title"
                        label="Titulo"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        placeholder={dataPost?.title ? dataPost?.title : ""}
                        onChange={formik.handleChange}
                        error={formik.errors.title}
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
                        name="post"
                        label="Post"
                        id="post"
                        placeholder={dataPost?.post ? dataPost?.post : ""}
                        autoComplete="current-post"
                        onChange={formik.handleChange}
                        error={formik.errors.post}
                        onBlur={handleBlur}
                    />
                    {viewPass && <div>
                        <p className="text-red-700 text-xs">{errorMessagePass}</p>
                    </div>}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleBlur}
                    >
                        Guardar
          </Button>

                </form>
            </div>

        </Container>
    );
}

function initialValues() {
    return {
        title: "",
        post: "",
    };
}

function validationSchema() {
    return {
        title: Yup.string().required(true),
        post: Yup.string().required(true),
    };
}
