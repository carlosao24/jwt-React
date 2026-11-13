import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE_URL } from '../config/apiConfig';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Credenciales inválidas o error en el servidor');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token || data);
      navigate('/perfil');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleLogin}>
        <h2>Iniciar Sesión</h2>
        {error && <div className="alert error">{error}</div>}
        
        <div className="input-group">
          <label>Usuario</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>

        <button type="submit" className="btn-primary">Ingresar</button>

        <p className="auth-redirect">
          ¿No tienes una cuenta? <Link to="/registrar">Regístrate aquí</Link>
        </p>
      </form>
    </div>
  );
}