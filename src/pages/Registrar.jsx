import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from '../config/apiConfig';

export default function Registrar() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('USER');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMensaje({ texto: '', tipo: '' });

    try {
      const response = await fetch(`${API_BASE_URL}/auth/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, rol }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'No se pudo completar el registro');
      }

      setMensaje({ 
        texto: '¡Registro exitoso! Redirigiendo al login...', 
        tipo: 'success' 
      });

      setTimeout(() => {
        navigate('/');
      }, 2000);

    } catch (err) {
      setMensaje({ 
        texto: err.message || 'Error de conexión con el servidor', 
        tipo: 'error' 
      });
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleRegister}>
        <h2>Crear Cuenta</h2>
        
        {mensaje.texto && (
          <div className={`alert ${mensaje.tipo}`}>
            {mensaje.texto}
          </div>
        )}

        <div className="input-group">
          <label>Nombre de Usuario</label>
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

        <div className="input-group">
          <label>Rol en el Sistema</label>
          <select value={rol} onChange={(e) => setRol(e.target.value)}>
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>

        <button type="submit" className="btn-primary">Registrarse</button>

        <p className="auth-redirect">
          ¿Ya tienes cuenta? <Link to="/">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}