import { useState } from 'react'
import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from './pages/Login.jsx';
import PrivateRoute from './auth/PrivateRoute .jsx';
import Dashboard from './pages/Dashboard.jsx';
import AppLayout from './layouts/AppLayout.jsx';

function App() {

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            {/* <Route path="/tasks" element={<Tasks />} /> */}
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
