import React, {Component, Fragment} from 'react';
import {
    IconButton,
    Paper,
    List,
    ListItem,
    ListItemText,
    ListItemSecondaryAction,
    CssBaseline,
    Container,
    Typography,
    Button,
    Fab,
    Tooltip
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {
    Delete as DeleteIcon,
    Add as AddIcon
} from '@material-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import camera from '../../services/Camera'

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(6),
    },
    addButton: {
        position: 'absolute',
        bottom: theme.spacing(4),
        right: theme.spacing(4),
    }
});

class Cameras extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cameras: []
        };
    }

    componentDidMount() {
        this.getCameras();
    }

    getCameras() {
        camera.getAll((err, data) => {
            if (!err) this.setState({cameras: data});
        });
    }

    deleteCamera(id) {
        camera.delete(id, (err) => {
            if (!err) this.getCameras();
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <Fragment>
                <CssBaseline />
                <Container fixed className={classes.paper}>
                    {this.state.cameras.length > 0 ? (
                        <Paper>
                            <List>
                                {this.state.cameras.map(camera => (
                                    <ListItem
                                        button
                                        key={camera._id}
                                        component={RouterLink} to={`/camera-view/${camera._id}`}
                                    >
                                        <ListItemText
                                            primary={camera.title}
                                            secondary={camera.url}
                                        />
                                        <ListItemSecondaryAction>
                                            <Tooltip title="Remove camera">
                                                <IconButton
                                                    color="inherit"
                                                    onClick={() => this.deleteCamera(camera._id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    ) : (
                        <Typography variant="subtitle1">
                            No posts to display. <Button color="primary" component={RouterLink} to="/">
                                Add your first stream
                            </Button>
                        </Typography>
                    )}

                    <Tooltip title="Add camera">
                        <Fab color="primary" aria-label="add"
                             component={RouterLink} to="/"
                             className={classes.addButton}
                        >
                            <AddIcon />
                        </Fab>
                    </Tooltip>
                </Container>
            </Fragment>
        );
    }
}

export default withStyles(styles)(Cameras);
