import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { FormLogin, FormSigIn } from "../../components";

const useStyles = makeStyles((theme) => ({
    modal: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));




export default function ModalBasic(props) {
    const { show, setShow, title, children, ...rest } = props;
    const classes = useStyles();
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);

    const handleOpenLogin = () => {
        setOpenLogin(true);
        setOpenRegister(false);
    };

    const handleOpenRegister = () => {
        setOpenLogin(false);
        setOpenRegister(true);
    };

    const handleClose = () => {
        setOpenLogin(false);
        setOpenRegister(false);
    };

    return (
        <div {...rest}>
            <div className="flex flex-row">
                <button
                    type="button"
                    className="textColor text-lg font-semibold"
                    onClick={handleOpenLogin}
                >
                    Inicio sesión
                </button>
                <p className="textColor text-lg font-semibold px-2">/</p>
                <button
                    type="button"
                    className="textColor text-lg font-semibold"
                    onClick={handleOpenRegister}
                >
                    Registro
                </button>
            </div>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={openLogin}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className={classes.paper}>
                    <FormLogin setOpenRegister={setOpenRegister} handleOpenRegister={handleOpenRegister} />
                </div>
            </Modal>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={openRegister}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className={classes.paper}>
                    <FormSigIn handleOpenLogin={handleOpenLogin} />
                </div>
            </Modal>
        </div>
    );
}
