import React, { useReducer, createContext } from "react"

const initialState = {
  user: null,
  notes: [],
}

const AuthContext = createContext({
  user: null,
  notes: [],
  setNotes: data => {},
  setUser: data => {},
  addNote: data => {},
  deleteNote: data => {},
  updateNote: data => {},
})

function authReducer(state, action) {
  switch (action.type) {
    case "setUser": {
      return {
        user: action.payload,
      }
    }
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
    case "updateNote": {
      return {
        notes: state.notes.forEach(note => {
          if (note.id === action.payload.id) note = action.payload // might need an update
        }),
      }
    }
    default: {
      return state
    }
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  function setUser(data) {
    dispatch({
      type: "setUser",
      payload: data,
    })
  }
  function addNote(data) {
    dispatch({
      type: "addNote",
      payload: data,
    })
  }
  function setNotes(data) {
    dispatch({
      type: "setNotes",
      payload: data,
    })
  }
  function deleteNote(data) {
    dispatch({
      type: "deleteNote",
      payload: data,
    })
  }
  function updateNote(data) {
    dispatch({
      type: "updateNote",
      payload: data,
    })
  }
  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        setUser,
        notes: state.notes,
        addNote,
        setNotes,
        updateNote,
        deleteNote,
      }}
      {...props}
    />
  )
}

export { AuthContext, AuthProvider }
