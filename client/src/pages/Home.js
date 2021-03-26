import React, {Component} from 'react';
import {
    Button,
    CssBaseline,
    TextField,
    Typography,
    Container
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import camera from "../services/Camera";

const styles = theme => ({
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
    },
});

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            url: '',
            error: false
        };
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();

        camera.add(this.state, err => {
            if (!err) {
                this.props.history.push('/cameras');
            } else {
                this.setState({error: true})
            }
        });
    }

    render() {
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Add a new camera URL
                    </Typography>
                    <form
                        className={classes.form}
                        noValidate
                        onSubmit={this.onSubmit}
                    >
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="Title"
                            name="title"
                            autoComplete="title"
                            autoFocus
                            error={this.state.error}
                            onChange={this.handleInputChange}
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="url"
                            label="URL rtsp://"
                            type="url"
                            id="url"
                            autoComplete="url"
                            error={this.state.error}
                            onChange={this.handleInputChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Add URL
                        </Button>
                    </form>
                </div>
            </Container>
        );
    }
}

export default withStyles(styles)(Home);
