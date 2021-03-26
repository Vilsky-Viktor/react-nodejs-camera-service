import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import auth from '../services/Auth'

// Small auth check middleware
export default function withAuth(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                redirect: false,
            };
        }
        componentDidMount() {

            auth.isAuthenticated(val => {
                this.setState({ redirect: !val })
            })

        }

        render() {
            const { redirect } = this.state;
            if (redirect) return <Redirect to="/login" />;
            return <ComponentToProtect {...this.props} />;
        }
    }
}
