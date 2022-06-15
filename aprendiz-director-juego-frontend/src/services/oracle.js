/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = 'http://localhost:3001/oracle'

const get = () => {
  return axios.get(baseUrl)
}

export default {
  get
}