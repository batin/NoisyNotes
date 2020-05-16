import React from "react"
import GlobalContextProvider from "./src/services/auth"

export const wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}
