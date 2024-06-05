import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3006',
    withCredentials: true
})

api.interceptors.request.use(
    config => {
        const token = JSON.parse(localStorage.getItem('userToken'));
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

export const signup = async (data) => {
    try {
        let res = await api.post('/signup', data);
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const login = async (data) => {
    try {
        let res = await api.post('/login', data);
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const addCategory = async (data) => {
    console.log(data)
    try {
        let res = await api.post('/addCategory', data, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        });
        console.log(res);
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const getCategories = async (type) => {
    try {
        let res = await api.get(`/getCategories/${type}`);
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const submitTransaction = async (amount, category, type, date) => {
    try {
        let res = await api.post('/addTransaction', { amount, category, type, date });
        return res;
    } catch (err) {
        console.log(err);
        return err;
    }
}

export const getTransaction = async () => {
    try {
        let res = await api.get('/wallet');
        return res;
    } catch (err) {
        return err;
    }
}
