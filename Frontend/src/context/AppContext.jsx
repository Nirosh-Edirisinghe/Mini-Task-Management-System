import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const [users, setUsers] = useState([]);

  // Fetch All Users
  const fetchUsers = async () => {

    try {
      const { data } = await axios.get(`${backendUrl}/api/user/all-users`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, []);

  const value = {
    backendUrl, token, users,fetchUsers
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
