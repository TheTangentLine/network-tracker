import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"

import LoginPage from "./pages/auth/LoginPage"
import RegisterPage from "./pages/auth/RegisterPage"
import TestingPage from "./pages/TestingPage"
import HistoryPage from "./pages/HistoryPage"

import ChatBotPage from "./pages/ChatBotPage"
import PrivateRoute from "./components/auth/PrivateRoute"
import AuthDirect from "./pages/auth/AuthDirect"
import SettingsPage from "./pages/SettingsPage"

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>

          <Routes>

            {/*------------------------ Public route -----------------------*/}

            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<AuthDirect />} />

            {/*------------------------ Private route -----------------------*/}

            <Route path="/chatbot" element={<PrivateRoute><ChatBotPage /></PrivateRoute>} />
            <Route path="/testing" element={<PrivateRoute><TestingPage /></PrivateRoute>} />
            <Route path="/history" element={<PrivateRoute><HistoryPage /></PrivateRoute>} />
            <Route path="/settings" element={<PrivateRoute><SettingsPage /></PrivateRoute>} />

          </Routes>

        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
