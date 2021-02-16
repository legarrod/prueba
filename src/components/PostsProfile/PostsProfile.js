import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { getData } from "../Api/AsyncHttpRequest"
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { CreatePosts } from '../../components';
import { remove } from "../Api/AsyncHttpRequest"
import swal from 'sweetalert';
const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
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

const cards = [1, 2, 3, 4];

export default function Album() {
    const classes = useStyles();
    const [openUpdatepost, setOpenUpdatepost] = useState(false);
    const [dataPost, setDataPost] = useState('');
    const [data, setData] = useState([]);
    const url = `${process.env.REACT_APP_API_ALL_POSTS}/posts?userId=1`;
    const urlRemove = `${process.env.REACT_APP_API_ALL_POSTS}/posts`;
    const getDataEvent = () => {
        getData(url, setData);
    };
    const handleClose = () => {
        setOpenUpdatepost(false);
    };

    const handleOpen = (e) => {
        setDataPost(e)
        setOpenUpdatepost(true);
    };

    const handlerRemove = (e) => {
        remove(`${urlRemove}/${e.id}`)
        return swal({
            title: "Exelente",
            text: "El post se elimino correctamente",
            icon: "success",
            button: "Continuar",
        }).then((value) => {
            console.log(value);
        });
    }

    useEffect(() => {
        // setUserAuth(JSON.parse(localStorage.getItem("user")));
        getDataEvent();
    }, []);

    return (
        <React.Fragment>

            <main>
                {/* Hero unit */}
                <Container className="flex flex-wrap" maxWidth="md">
                    {/* End hero unit */}
                    <Grid container spacing={4}>
                        {data.map((card) => (
                            <Grid item key={card} xs={12} sm={6} md={6}>
                                <Card className={classes.card}>

                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {card.title}
                                        </Typography>
                                        <Typography>
                                            {card.body}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => handlerRemove(card)}>
                                            Eliminar
                    </Button>
                                        <Button size="small" color="primary" onClick={() => handleOpen(card)}>
                                            Edit
                    </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={openUpdatepost}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className={classes.paper}>
                    <CreatePosts dataPost={dataPost} setOpenUpdatepost={setOpenUpdatepost} openUpdatepost={openUpdatepost} />
                </div>
            </Modal>
            {/* Footer */}

            {/* End footer */}
        </React.Fragment>
    );
}