import React, { useReducer, createContext } from 'react'
import reducer, { initialState } from './reducers'

// Create context
const Store = createContext()

// Create store
const createStore = (reducer, initialState) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return { state, dispatch }
}

// Return store provider
const Provider = ({ children }) => {
    const store = createStore(reducer, initialState)
    return <Store.Provider value={store}>{children}</Store.Provider>
}

export { Store, Provider }