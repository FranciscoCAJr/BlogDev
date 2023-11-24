import React, { useState, useEffect } from 'react';
import { userAuthentication } from '../../hooks/userAuthentication';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { loginU, error: authError, loading } = userAuthentication();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const user = {
      email,
      password,
    };
    const res = await loginU(user);
    if (res) {
      navigate('/');
    } else {
      setError('Email ou senha incorretos');
    }
  };
  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <span>E-mail: </span>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </label>
        <label>
          <span>Senha: </span>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
        </label>
        {!loading && <button className="btn">Login</button>}
        {loading && <button className="btn" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;