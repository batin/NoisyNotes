const React = require("react")
const GlobalContextProvider = require("./src/services/auth").default

exports.wrapRootElement = ({ element }) => {
  return <GlobalContextProvider>{element}</GlobalContextProvider>
}
