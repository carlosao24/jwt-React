import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvaider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Perfil from './pages/Perfil'
import Login from './pages/Login'
import Registrar from './pages/Registrar' 
import './App.css'

function App() {
  return (
    <AuthProvaider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registrar" element={<Registrar />} /> 

          <Route element={<ProtectedRoute />}>
            <Route path="/perfil" element={<Perfil />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvaider>
  )
}

export default App