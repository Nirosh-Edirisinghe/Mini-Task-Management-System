import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user.token;

  const value = {
    backendUrl, token
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
