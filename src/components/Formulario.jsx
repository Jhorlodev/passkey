import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FaLock } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { FaMagnifyingGlass } from "react-icons/fa6";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_KEY;


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
        setDatos(data);
      }
      // Restablecer los campos a valores iniciales después de enviar el formulario
      e.target.reset()
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
                <h1 className="font-bold text-5xl text-white mb-8  flex justify-center items-center mx-auto">
                  <FaLock className='h-14 w-14 mr-8' />
                  <strong >
                     
                    PASSKEY
                    </strong>
                </h1>
               
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
                  className="border-2 border-violet-500 rounded-lg text-gray-200 text-center py-3 px-14 text-bolt bg-[#3b426a] "
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
                  className="flex justify-center items-center gap-4 rounded-lg bg-indigo-500  border-2 border-[#ac84f1] text-white text-lg py-3 px-14 mt-8 font-bold"
                  type="submit"
                >
                  Enviar
                  <strong> <LuSend className='h-6 w-6'/></strong>
                 
                </button>
                <a
                  href="DataResult"
                  className="flex justify-center items-center gap-4 rounded-lg bg-indigo-500 border-2 border-[#ac84f1] text-white text-lg py-3  mt-8 font-bold"
                >
                  Busqueda De Datos
                  <FaMagnifyingGlass className='h-6 w-6'/>
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;