import axios from 'axios'
import Cookies from 'js-cookie'
const getToken = Cookies.get('accessToken')
const api = axios.create({
    baseURL: 'http://localhost:3001',
    headers: {
        'api-key': 'apiKey',
        'Content-Type': 'application/json'
    }
})
const API_URL = 'http://localhost:3001'
export const URL_UPLOAD = API_URL + '/'

api.interceptors.request.use(
    (config: any) => {
        if (getToken) {
            config.headers['Authorization'] = `${getToken}`
            config.headers['api-key'] = `apiKey`
        }
        return config
    },
    (error) => Promise.reject(error)
)

export default api
