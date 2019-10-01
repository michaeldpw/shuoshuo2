import axios from 'axios'
import { url } from '../url'

export const login = (user) => {
    return (dispatch) => {
        return axios.post(url + '/checklogin', user).then(res => {
            console.log(res.data)
            dispatch({
                type: 'LOG_IN',
                payload: res.data
            })
        })
    }
}

export const logout = () => {
    return (dispatch) => {
        return axios.get(url + '/logout').then(res => {
            dispatch({
                type: 'LOG_OUT'
            })
          })
    }
}