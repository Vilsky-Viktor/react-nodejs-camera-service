import axios from 'axios';

// Service to handle all the request regarding Video streams to API
class Camera {
    add(data, callback) {
        const req = {
            title: data.title,
            url: data.url,
        };

        axios.post(process.env.REACT_APP_API_URL + '/api/cameras', req, { withCredentials: true })
            .then(res => {
                callback(null);
            })
            .catch(err => {
                callback(err);
            });
    }

    getAll(callback) {

        axios.get(process.env.REACT_APP_API_URL + '/api/cameras', { withCredentials: true })
            .then(res => {
                callback(null, res.data.data.items);
            })
            .catch(err => {
                callback(err);
            });

    }

    get(id, callback) {

        axios.get(process.env.REACT_APP_API_URL + '/api/cameras/' + id, { withCredentials: true })
            .then(res => {
                callback(null, res.data.data.item);
            })
            .catch(err => {
                callback(err);
            });

    }

    delete(id, callback) {

        axios.delete(process.env.REACT_APP_API_URL + '/api/cameras/' + id, { withCredentials: true })
            .then(res => {
                callback(null);
            })
            .catch(err => {
                callback(err);
            });

    }
}

const camera = new Camera();
export default camera;
