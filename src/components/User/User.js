import React, { useState } from 'react'
import { Posts } from "../../components";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { CreatePosts } from '../../components';

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

export default function User() {
    let data = JSON.parse(localStorage.getItem("user"))
    const classes = useStyles();
    const [openRegister, setOpenRegister] = useState(false);

    const handleClose = () => {
        setOpenRegister(false);
    };

    const handleOpen = () => {
        setOpenRegister(true);
    };
    return (

        <div className="flex flex-wrap justify-center">
            {data && <><div className="flex flex-wrap justify-center">
                <div>
                    <img className="rounded-full h-60 w-60" src={data ? data?.img : 'https://recursospracticos.com/wp-content/uploads/2017/10/Sin-foto-de-perfil-en-Facebook.jpg'} style={{ objectFit: "cover" }} />
                </div>

                <div className="ml-10 mt-5">
                    <p className="text-3xl font-semibold">{data?.name}</p>
                    <p>{data?.email}</p>
                    <div className='mt-5'>

                        <button
                            type="button"
                            className="textColor text-lg font-semibold"
                            onClick={handleOpen}
                        >
                            <AddCircleOutlineIcon /> Crear post
                        </button>
                    </div>
                </div>

            </div>
                <div className="mt-10">
                    <p className="text-3xl font-semibold">Mis posts</p>
                    <Posts />
                </div>


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
                        <CreatePosts />
                    </div>
                </Modal></>}

        </div>
    )
}
