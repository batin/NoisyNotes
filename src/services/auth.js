import React, { useReducer, createContext } from "react"
const isBrowser = () => typeof window !== "undefined"

const getUser = () =>
  isBrowser() && window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : null

const initialState = {
  user: getUser(),
  notes: [],
  token: isBrowser() ? localStorage.getItem("TOKEN") : null,
}

const AuthContext = createContext({
  user: null,
  notes: [],
  setNotes: data => {},
  setUser: data => {},
  addNote: data => {},
  deleteNote: data => {},
  updateNote: data => {},
  login: (userData, token) => {},
  logout: () => {},
})

function authReducer(state, action) {
  switch (action.type) {
    case "setUser": {
      return {
        user: action.payload,
      }
    }
    case "setToken": {
      return {
        token: action.payload,
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
    case "login":
      return {
        ...state,
        user: action.payload,
      }
    case "logout":
      return {
        ...state,
        user: null,
      }
    default: {
      return state
    }
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  function login(userData, token) {
    localStorage.setItem("TOKEN", token)
    localStorage.setItem("user", JSON.stringify(userData))
    dispatch({
      type: "login",
      payload: userData,
    })
    console.log("login basarili")
  }

  function logout() {
    localStorage.removeItem("TOKEN")
    localStorage.removeItem("user")
    dispatch({ type: "logout" })
    console.log("logout basarili")
  }
  function setUser(data) {
    dispatch({
      type: "setUser",
      payload: data,
    })
  }
  function setToken(data) {
    dispatch({
      type: "setToken",
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
        setToken,
        token: state.token,
        notes: state.notes,
        addNote,
        setNotes,
        updateNote,
        deleteNote,
        login,
        logout,
      }}
      {...props}
    />
  )
}

export { AuthContext, AuthProvider }
