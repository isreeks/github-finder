import { createContext, useReducer } from 'react'
import alertsReducer from './AlertsReducer'

const AlertsContext = createContext()
export const AlertsProvider = ({ children }) => {
    const initialState = null
    const [state, dispatch] = useReducer(alertsReducer, initialState)

    const setAlert = (msg, type) => {
        dispatch({
            type: 'SET_ALERT',
            payload: {msg, type}
        })

        setTimeout(() => dispatch({
            type: 'REMOVE_ALERT'
        }),3000)
    }

    return <AlertsContext.Provider value={{
        alert: state
    }}>
        {children}
    </AlertsContext.Provider>
}

export default AlertsContext