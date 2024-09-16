import React from 'react';
import { signOut } from '../lib/auth';

export default function signOut() {
  const handleLogout = async () => {
    try {
      await signOut();
      // Redirigir al usuario a la página de inicio o de login
      window.location.href = '/';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    >
      Cerrar Sesión
    </button>
  );
}