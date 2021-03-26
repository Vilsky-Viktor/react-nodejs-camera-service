import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import auth from '../services/Auth'

// Small guest check middleware
export default function guest(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                redirect: false,
            };
        }
        componentDidMount() {
            auth.isAuthenticated(val => {
                this.setState({ redirect: val })
            })
        }

        render() {
            const { redirect } = this.state;
            if (redirect) return <Redirect to="/" />;
            return <ComponentToProtect {...this.props} />;
        }
    }
}
