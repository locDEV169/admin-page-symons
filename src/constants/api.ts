import axios from 'axios'
import Cookies from 'js-cookie'
const API_URL = process.env.API_URL || 'http://127.0.0.1:3000'
export const URL_UPLOAD = API_URL + '/uploads/'

const getToken = Cookies.get('token')

const api = axios.create({
    baseURL: `${API_URL}`
})

api.interceptors.request.use(
    (config) => {
        if (getToken) {
            config.headers['Authorization'] = `Bearer ${getToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default api
