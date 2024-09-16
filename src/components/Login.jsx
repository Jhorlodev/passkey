import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Inicializa el cliente de Supabase
const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
);

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      // Redirige a la página del formulario
      window.location.href = '/formulario'; // Asegúrate de que la ruta sea correcta
      console.log('Sesión iniciada:', user);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className='flex flex-col gap-4 mt-10 bg-[#1b1b32] mx-auto justify-center rounded p-4 h-[300px] max-w-lg shadow-lg shadow-purple-950'>
      <div className='flex flex-col gap-4 justify-center'>
        <input
          className='py-1 px-4 rounded-lg bg-gray-300'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
          required
        />
        <input
          className='py-1 px-4 rounded'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          required
        />
        <button className='flex items-center cursor-pointer gap-2 rounded-lg px-3 py-[10px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-button text-white shadow-button hover:shadow-button-hover hover:scale-110 ml-auto font-medium shadow-sm shadow-purple-900/50 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 w-44 justify-center mx-auto' type="submit">Iniciar Sesión</button>
        {error && <p>{error}</p>}
      </div>
    </form>
  );
}