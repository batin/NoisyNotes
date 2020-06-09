import React, { useReducer, createContext } from "react"

const isBrowser = () => typeof window !== "undefined"

const setCookie = (cname, cvalue, hours) => {
  const d = new Date()
  d.setTime(d.getTime() + hours * 60 * 60 * 1000)
  const expires = "expires=" + d.toUTCString()
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/"
}

const getUser = () =>
  isBrowser() && window.localStorage.getItem("user")
    ? JSON.parse(window.localStorage.getItem("user"))
    : null

const getCookie = cname => {
  var name = cname + "="
  var ca = document.cookie.split(";")
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === " ") {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ""
}

const getToken = () => {
  return isBrowser() ? getCookie("Token") : null
}

const initialState = {
  user: getUser(),
  token: getToken(),
}

const AuthContext = createContext({
  user: null,
  token: null,
  setNoises: data => {},
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
        ...state,
        user: action.payload,
      }
    }
    case "setToken": {
      return {
        ...state,
        token: action.payload,
      }
    }
    case "addNote": {
      return {
        ...state,
        user: {
          ...state.user,
          Noises: [action.payload, ...state.notes],
        },
      }
    }
    case "setNoises": {
      return {
        ...state,
        user: {
          ...state.user,
          Noises: action.payload,
        },
      }
    }
    case "deleteNote": {
      return {
        ...state,
        user: {
          ...state.user,
          Noises: state.notes.filter(note => note.id !== action.payload),
        },
      }
    }
    case "updateNote": {
      return {
        ...state,
        user: {
          ...state.user,
          Noises: state.notes.forEach(note => {
            if (note.id === action.payload.id) note = action.payload // might need an update
          }),
        },
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
        token: null,
      }
    default: {
      return state
    }
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState)
  function login(userData, token) {
    dispatch({
      type: "login",
      payload: userData,
    })
    dispatch({
      type: "setToken",
      payload: token,
    })
    setCookie("Token", token, 1)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  function logout() {
    dispatch({ type: "logout" })
    setCookie("Token", null, 1)
    localStorage.removeItem("user")
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
  function setNoises(data) {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...state.user, Noises: data })
    )
    dispatch({
      type: "setNoises",
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
        setNoises,
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
