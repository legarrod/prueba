import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        width: 400,
        height: 600,
        paddingTop: "56.25%", // 16:9
    },
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function BooksCards({ data, selectOptionCard }) {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className="flex flex-wrap justify-center">
            {selectOptionCard === false && Array.isArray(data) === true ? data.map((item) => (
                <Card
                    className={`${classes.root} mx-5 my-6 w-11/12 sm:w-full md:w-4/5 lg:w-9/12`}
                    key={item?.id}
                >
                    <p id="title" className="text-lg text-center font-semibold h-20 my-5 px-4">
                        {item?.title}
                    </p>
                    <center>
                        <img
                            className={` mb-4`}
                            src={item?.thumbnailUrl}
                            style={{ objectFit: "cover" }}
                        />
                    </center>


                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            )) : <Card
                className={`${classes.root} mx-5 my-6 w-11/12 sm:w-full md:w-4/5 lg:w-9/12`}
                key={data?.id}
            >
                    <p id="title" className="text-lg text-center font-semibold h-20 my-5 px-4">
                        {data?.title}
                    </p>
                    <center>
                        <img
                            className={` mb-4`}
                            src={data?.thumbnailUrl}
                            style={{ objectFit: "cover" }}
                        />
                    </center>


                    <CardActions disableSpacing>
                        <IconButton id="add to favorites" aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton id="share" aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            id="show more"
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                </Card>}
        </div>
    );
}
