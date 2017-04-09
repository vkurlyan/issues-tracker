import axios from 'axios'

/**
 * Creates github server instance
 * @param token
 * @returns {options}
 */
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

/**
 * Get error message from GitHub server
 * @param error
 * @returns {string}
 */
export const getErrorMessage = (error) => {
    let message = 'Bad request';

    if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message
    }

    return message;
}

export default createGithubInstance;
