import axios from "axios";
const GITHIB_URL = process.env.REACT_APP_GITHUB_URL
const GITHIB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


const github = axios.create({
    baseURL : GITHIB_URL,
    headers : {
        Authorization: `token ${GITHIB_TOKEN}`
    }
})


export const searchUsers = async (text) => {
    const params = new URLSearchParams({
        q: text
    })
    const response = await github.get(`/search/users?${params}`)

    return response.data.items
};

// User and Repos


export const getUserAndRepos = async(login) => {
    const [user, repos] = await Promise.all([
        github.get(`/users/${login}`),
        github.get(`/users/${login}/repos`)
    ])

    return {user: user.data, repos : repos.data }
}