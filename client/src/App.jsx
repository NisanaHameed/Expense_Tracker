import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserRoutes from './Routes/UserRoutes'
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Router>
        <Routes>
          <Route path='/*' element={<UserRoutes />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
