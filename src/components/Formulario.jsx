import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://glxjuubfbueivfedkuzz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdseGp1dWJmYnVlaXZmZWRrdXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0ODg4NTQsImV4cCI6MjAyOTA2NDg1NH0.uBI5fP-F9nJ9_hMeoDKzp1yBWgRCXgrLyBM5YwPceyw';

const supabase = createClient(supabaseUrl, supabaseKey);

const App = () => {
  const [datos, setDatos] = useState({
    descripcion: '',
    correo: '',
    contraseña: '',
  });

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('datos')
        .insert({ descripcion: datos.descripcion, correo: datos.correo, contraseña: datos.contraseña })
        .single();
      if (error) throw error;
      if (data != null) {
        setData(data);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  
  return (
    <div className="container ml-auto mr-auto flex flex-col items-center justify-center">
      <div className="w-full md:w-1/2">
        <form
          className="flex flex-col px-8 pb-8 mb-4 h-screen justify-center items-center"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <div className="grid grid-flow-row sm:grid-flow-col gap-4">
              <div className="sm:col-span-4 justify-center flex flex-col gap-2">
                <h1 className="font-bold text-4xl text-white mb-8 underline underline-offset-8 flex justify-center items-center">
                  <strong>Caja Fuerte</strong>
                </h1>
                <a
                  href="DataResult"
                  className="flex justify-end text-white text-2xl font-bold pt-8 pr-10 pb-6"
                >
                  Busqueda De Datos
                </a>
                <label className="text-white flex gap-0 text-2xl font-semibold">
                  Descripcion:
                </label>
                <input
                  className="border-2 border-violet-500 rounded-lg text-center py-3 px-14 text-bolt bg-[#3b426a] text-gray-200"
                  type="text"
                  name="descripcion"
                  placeholder="Detalle"
                  onChange={handleChange}
                />
                <label className="text-white flex gap-0 text-2xl font-semibold">
                  Correo:
                </label>
                <input
                  className="border-2 border-violet-500 rounded-lg text-gray-200 text-center py-3 px-14 text-bolt bg-[#3b426a] hover:bg-violet-600"
                  name="correo"
                  type="email"
                  placeholder="Correo@correo.com"
                  onChange={handleChange}
                />
                <label className="text-white flex gap-0 text-2xl font-semibold">
                  Contraseña:
                </label>
                <input
                  className="border-2 border-violet-500 rounded-lg text-gray-200 text-center py-3 px-14 text-bolt bg-[#3b426a]"
                  name="contraseña"
                  type="password"
                  placeholder="...**..."
                  onChange={handleChange}
                />
                <button
                  className="rounded-lg bg-indigo-500 text-white py-3 px-14 mt-8 font-bold"
                  type="submit"
                >
                  Enviar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;