import React, { Component } from 'react';
import {
    Typography,
    Container,
    Button
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink } from 'react-router-dom';
import camera from "../../services/Camera";

const styles = theme => ({
    paper: {
        marginTop: theme.spacing(8),
    },
    flex: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    video: {
        marginTop: theme.spacing(6),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
});

class CameraView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            camera: null
        };
    }

    componentDidMount() {
        this.getCamera();
    }

    getCamera() {
        camera.get(this.props.match.params.id, (err, data) => {
            if (!err) {
                data.src = `https://wcs5-eu.flashphoner.com:8888/embed_player?urlServer=wss://wcs5-eu.flashphoner.com:8443&streamName=${data.url}&mediaProviders=WebRTC,Flash,MSE,WSPlayer`;
                this.setState({camera: data});
            }
        });
    }

    render() {
        const { classes } = this.props;
        return(
            <Container component="main" className={classes.paper}>
                {this.state.camera ? (
                    <div className={classes.flex}>
                        <Typography component="h1" variant="h5">
                            Video stream "{this.state.camera.title}"
                        </Typography>

                        <iframe id='fp_embed_player' className={classes.video} title={this.state.camera.title}
                                src={this.state.camera.src}
                                marginWidth='0' marginHeight='0' frameBorder='0' width='700px' height='400px'
                                scrolling='no' allowFullScreen='allowfullscreen'></iframe>
                    </div>
                ) : (<Typography component="h1" variant="h5">Loading ...</Typography>)}

                <div className={classes.video}>
                    <Button variant="contained" color="primary" component={RouterLink} to="/cameras">
                        Back to list
                    </Button>
                </div>
            </Container>
        )
    }
}

export default withStyles(styles)(CameraView);
