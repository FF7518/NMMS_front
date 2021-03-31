// const baseUrl = "http://127.0.0.1:5000/"
const baseUrl = "http://10.206.254.31:5000/"

import axios from 'axios'

export function baseAxios(config) {
    const instance = axios.create({
        baseURL: baseUrl,
        timeout: 5000,
    })
    return instance(config)
}