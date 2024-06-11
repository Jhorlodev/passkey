import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://glxjuubfbueivfedkuzz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdseGp1dWJmYnVlaXZmZWRrdXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0ODg4NTQsImV4cCI6MjAyOTA2NDg1NH0.uBI5fP-F9nJ9_hMeoDKzp1yBWgRCXgrLyBM5YwPceyw';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function App() {
  const [data, setData] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);

  useEffect(() => {
    const fetchDatos = async () => {
      const { data, error } = await supabase
        .from('datos')
        .select('*');
      if (data) {
        setData(data);
      }
    };
    fetchDatos();
  }, []);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    realizarBusqueda();
    setBusqueda('');
  };

  const realizarBusqueda = () => {
    const resultadoDeBusquedad = data.filter((elemento) =>
      elemento.descripcion.toLowerCase().includes(busqueda.toLowerCase())
    );
    setResultados(resultadoDeBusquedad);
    setBusquedaRealizada(true);
  };

  
  const eliminar = async (id) => {
    try{
      const {data, error} = await supabase
        .from('datos')
        .delete()
        .eq('id', id);
        if(error) throw error;
        window.location.reload();
    } catch(error){
      alert(error.message);
    }
  }


  return (
    <main className=" h-screen bg-[#00171f] ">
      <a
        href="/"
        className="flex justify-end text-white text-2xl font-bold pt-8 pr-10 pb-6"
      >
        Volver a Inicio
      </a>
      <form
        className="flex items-center justify-center gap-2 pb-5  "
        onSubmit={handleSubmit}
      >
        <input
          className="border-2 border-violet-500 rounded-lg text-gray-200 text-center py-2.5  text-bolt bg-[#3b426a]"
          type="text"
          value={busqueda}
          placeholder="Descripcion a Buscar"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="grid rounded-lg bg-indigo-500 text-white py-3 px-3 gap-1.5 font-bold"
        >
          Buscar
        </button>
      </form>

      {busquedaRealizada && (
        <div className="flex rounded-lg  text-white py-3  font-bold sm:mx-auto  sm:justify-center  md:justify-center ">
          <div className='md:w-1/3' >
            <div className="grid gap-2 py-3 px-3">
              <h1>Datos:</h1>
              {resultados.map((item, index) => (
                <ul key={index} className="grid rounded-lg bg-blue-950 text-white py-3 px-8 gap-2 font-bold  ">
                  
                  <div>Descripcion:  {item.descripcion}</div>
                  <div>Correo: {item.correo}</div>
                  <div>Contraseña: {item.contraseña}</div>
                  <div className="grid grid-cols-2 gap-3 w-4/5 mx-auto py-5">
                    <button
                      type="Edit"
                      className="grid rounded-lg bg-indigo-500 text-white font-bold py-3"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => eliminar(item.id)}
                      className="grid rounded-lg bg-indigo-500 text-white py-3 px-1 gap-1.5 font-bold"
                    >
                      Eliminar
                    </button>
                  </div>
                </ul>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}