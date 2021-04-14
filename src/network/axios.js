// const baseUrl = "http://127.0.0.1:9000/"
// const baseUrl = "http://10.206.254.31:5000/"
// const baseUrl = "http://10.206.144.207:8808"
// const baseUrl = "http://localhost:8085/C1_E2_ServletDemo_war_exploded/"
const baseUrl = "http://10.206.31.11:8080/"


import axios from 'axios'

export function baseAxios(config) {
    const instance = axios.create({
        baseURL: baseUrl,
        timeout: 5000,
    })
    return instance(config)
}