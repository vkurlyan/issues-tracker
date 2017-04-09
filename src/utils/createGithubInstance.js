import axios from 'axios'

export const createGithubInstance = (token) => {
    let options = {
        baseURL: 'https://api.github.com',
        timeout: 5000
    }
    if (token) {
        options.headers = {'Authorization': `token ${token}`}
    }
    return axios.create(options)
}

export default createGithubInstance;
