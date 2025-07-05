import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import PrivateRoute from "./components/PrivateRoute"
import Testing from "./pages/Testing"
import AuthDirect from "./pages/AuthDirect"

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>

          <Routes>

            // Public route
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<AuthDirect />} />

            // Private route
            <Route
              path="/testing"
              element={
                <PrivateRoute><Testing /></PrivateRoute>
              }
            />
          </Routes>


        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
