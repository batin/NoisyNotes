import React from "react"
import { AuthProvider } from "./src/services/auth"

export const wrapRootElement = ({ element }) => {
  return <AuthProvider>{element}</AuthProvider>
}
