import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const TaskDetails = () => {
  const { backendUrl, token } = useContext(AppContext)
  const { id } = useParams(); // get task id
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/task/get/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success){
        setTask(data.task);
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">{task.title}</h1>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Priority: {task.priority}</p>
    </div>
  );
};

export default TaskDetails;