import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext()


const GITHIB_URL = process.env.REACT_APP_GITHUB_URL
const GITHIB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN


export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        loading: false,

    }
    const [state, dispatch] = useReducer(githubReducer, initialState)

    const searchUsers = async (text) => {
        setLoading()
        const params = new URLSearchParams({
            q: text
        })
        const response = await fetch(`${GITHIB_URL}/search/users?${params}`, {
            headers: {
                Authorization: `token ${GITHIB_TOKEN}`,
            },
        });
        const { items } = await response.json();
        dispatch({
            type: 'GET_USERS',
            payload: items
        })
    };
    const setLoading = () => dispatch({
        type: 'SET_LOADING'
    })

    const clearUsers = () => dispatch ({
        type : 'CLEAR_USERS'
        
    })

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,

    }} >
        {children}
    </GithubContext.Provider>


}
export default GithubContext