import axios from 'axios'

const service = axios.create({
  baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd',
  headers: {
    'Content-type': 'application/json'
  }
})
export default service
