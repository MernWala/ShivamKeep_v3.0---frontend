import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import Auth from './pages/Auth'
import Home from './pages/Home'
import VerifyOtp from './pages/account/OTP_verification'
import ChangePassword from './pages/account/ChangePassword'

const App = () => {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="*" element={<>Page not found</>} />

          <Route path={"/"}>
            <Route path={'/'} element={<Auth />} />
            <Route path={'/post-login'} element={<Home />} />
          </Route>

          <Route path={"/account"}>
            <Route path="" element={<>account default page</>} />
            <Route path={"verify-email"} element={<VerifyOtp />} />
            <Route path={"change-password/:token"} element={<ChangePassword />} />
          </Route>

        </Routes>
      </HashRouter>
    </>
  )
}

export default App