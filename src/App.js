import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'

const App = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path={'/'} element={<Auth />} />
          <Route path={'/post-login'} element={<Home />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App