import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const AppContext = createContext()

const AppContextProvider = (props) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const user = JSON.parse(localStorage.getItem("user"));
  const token = user?.token;
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([])
  const [categories, setCategories] = useState([])

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

  const fetchTasks = async () => {

    try {
      const { data } = await axios.get(`${backendUrl}/api/task/get-tasks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) {
        setTasks(data.tasks)
      }
    } catch (error) {
      console.log(error);
    }
  }

  // get categories
  const getCategory = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/category/get-category`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (data.success) {
        setCategories(data.categories)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchTasks();
      getCategory();
    }
  }, []);

  const value = {
    backendUrl, token, users, fetchUsers, tasks, fetchTasks, user, categories, getCategory
  }

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )
}

export default AppContextProvider
