import React, { useState } from 'react';
import Layouts from '@/layouts/Layout.astro'
import { createClient } from '@supabase/supabase-js'
import LoginButton from '@/components/loginButton.jsx';

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY)

export default function RegistroForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleRegistro = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      setSuccess(true);
      setEmail('');
      setPassword('');
      console.log('Usuario registrado:', data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      
      <form onSubmit={handleRegistro} className="bg-[#1b1b32] shadow-lg shadow-purple-900  rounded-md px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="email">
            Correo Electrónico
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="******************"
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className='flex items-center cursor-pointer gap-2 rounded-lg px-3 py-[10px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-button text-white shadow-button hover:shadow-button-hover hover:scale-110 ml-auto font-medium shadow-sm shadow-purple-900/50 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 w-44 justify-center mx-auto'
            type="submit"
          >
            Registrarse
          </button>
        </div>
        {error && <p className="text-red-500 text-xs italic mt-4">{error}</p>}
        {success && <p className="text-green-500 text-xs italic mt-4">Registro exitoso. Por favor, verifica tu correo electrónico.</p>}
      </form>
    </div>
  );
}