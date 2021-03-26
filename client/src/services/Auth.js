import axios from 'axios';

// Service to handle all the request regarding Users to API
class Auth {
    logIn(data, callback) {

        const req = {
            email: data.email,
            password: data.password,
        };

        axios.post(process.env.REACT_APP_API_URL + '/api/users/login', req, { withCredentials: true })
            .then(res => {
                this.saveUserToStorage(res.data.data);
                callback(null);
            })
            .catch(err => {
                callback(err);
            });
    }

    register(data, callback) {

        const req = {
            name: data.name,
            email: data.email,
            password: data.password,
        };

        axios.post(process.env.REACT_APP_API_URL + '/api/users/signup', req, { withCredentials: true })
            .then(res => {
                this.saveUserToStorage(res.data.data);
                callback(null);
            })
            .catch(err => {
                callback(err);
            });

    }

    isAuthenticated(callback) {

        axios.get(process.env.REACT_APP_API_URL + '/api/users/check-token', {withCredentials: true})
            .then(res => {
                this.saveUserToStorage(res.data.data);
                callback(true);
            })
            .catch(err => {
                callback(false);
            })

    }

    isLoggedIn() {
        return Boolean(localStorage.getItem("user"));
    }

    getName() {
        const userData = JSON.parse(localStorage.getItem("user"));
        return userData.name;
    }

    saveUserToStorage(data) {
        localStorage.setItem("user", JSON.stringify(data));
    }

    logOut(callback) {
        axios.get(process.env.REACT_APP_API_URL + '/api/users/logout', {withCredentials: true})
            .then(res => {
                localStorage.removeItem("user");
                callback(true);
            })
            .catch(err => {
                callback(false);
            })

    }

}

const auth = new Auth();
export default auth;
