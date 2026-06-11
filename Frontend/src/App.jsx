import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';
import PrivateRoute from './auth/PrivateRoute .jsx';
import Dashboard from './pages/Dashboard.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import { ToastContainer, toast } from 'react-toastify';
import TeamMembers from './pages/TeamMembers.jsx';
import MyProfile from './pages/MyProfile.jsx';
import Tasks from './pages/Tasks.jsx';
import TaskDetails from './pages/TaskDetails.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/team" element={<TeamMembers />} />
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/task" element={<Tasks />} />
            <Route path="/task/:id" element={<TaskDetails />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
