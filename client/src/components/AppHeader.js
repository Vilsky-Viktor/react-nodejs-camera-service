import React, { Component } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    MenuItem,
    Menu,
    ListItemIcon,
    ListItemText,
    withStyles
} from '@material-ui/core';
import {
    AccountCircle,
    PowerSettingsNew
} from '@material-ui/icons';
import {
    Link,
    withRouter
} from 'react-router-dom';
import auth from '../services/Auth'

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        marginRight: theme.spacing(2),
    },
    grow: {
        flexGrow: 1,
    }
});

// Header with navigation, User info + logout
class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false,
        };
    }

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget, open: !this.state.open});
    };

    handleClose = () => {
        this.setState({anchorEl: null, open: false});
    };

    logOut = () => {
        this.handleClose();
        auth.logOut(res => {
            this.props.history.push('/login');
        });
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.title}>
                            AnyVision
                        </Typography>

                        {auth.isLoggedIn() && (
                            <div>
                                <Button color="inherit" component={Link} to="/">Home</Button>
                                <Button color="inherit" component={Link} to="/cameras">Cameras</Button>
                            </div>
                        )}

                        <div className={classes.grow} />

                        {auth.isLoggedIn() && (
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={this.state.anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(this.state.open)}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem>
                                        <ListItemIcon>
                                            <AccountCircle fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary={auth.getName()} />
                                    </MenuItem>
                                    <MenuItem onClick={this.logOut}>
                                        <ListItemIcon>
                                            <PowerSettingsNew fontSize="small" />
                                        </ListItemIcon>
                                        <ListItemText primary="Logout" />
                                    </MenuItem>
                                </Menu>
                            </div>
                        )}

                    </Toolbar>
                </AppBar>
            </div>
        );
    }

}

export default withRouter(withStyles(styles)(AppHeader));
