import React, { useReducer, createContext } from "react"

const initialState = {
  user: false,
  notes: [],
}
export const GlobalStateContext = React.createContext()
export const GlobalDispatchContext = React.createContext()

function reducer(state, action) {
  switch (action.type) {
    case "addNote": {
      return {
        notes: [action.payload, ...state.notes],
      }
    }
    case "setNotes": {
      return {
        notes: action.payload,
      }
    }
    case "deleteNote": {
      return {
        notes: state.notes.filter(note => note.id !== action.payload),
      }
    }
    default: {
      return state
    }
  }
}

const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  return (
    <GlobalStateContext.Provider value={state}>
      <GlobalDispatchContext.Provider value={dispatch}>
        {children}
      </GlobalDispatchContext.Provider>
    </GlobalStateContext.Provider>
  )
}

export default GlobalContextProvider
