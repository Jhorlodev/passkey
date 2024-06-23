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
  const [elementoSeleccionado, setElementoSeleccionado] = useState(null);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const { data, error } = await supabase.from('datos').select('*');
        if (error) throw error;
        setData(data);
      } catch (error) {
        alert(error.message);
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
    const userResponse = window.confirm('¿Seguro que quieres eliminar?');
    if (!userResponse) return;
    try {
      const { data, error } = await supabase.from('datos').delete().eq('id', id);
      if (error) throw error;
      const newResultados = resultados.filter((item) => item.id !== id);
      setResultados(newResultados);
      const newData = data.filter((item) => item.id !== id);
      setData(newData);
    } catch (error) {
      alert(error.message);
    }
  };

  const editar = (item) => {
    setElementoSeleccionado(item);
  };

  const actualizar = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('datos')
        .update({
          descripcion: elementoSeleccionado.descripcion,
          correo: elementoSeleccionado.correo,
          contraseña: elementoSeleccionado.contraseña,
        })
        .eq('id', elementoSeleccionado.id)
        .select();

      if (error) throw error;
      const updatedData = data[0];
      const newData = data.map((item) => (item.id === updatedData.id ? updatedData : item));
      setData(newData);
      setResultados(newData.filter((item) =>
        item.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      ));
      setElementoSeleccionado(null);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <main className="h-screen">
      <a
        href="/"
        className="flex justify-end text-white text-2xl font-bold pt-8 pr-10 pb-6"
      >
        Volver a Inicio
      </a>
      <form
        className="flex items-center justify-center gap-2 pb-5"
        onSubmit={handleSubmit}
      >
        <input
          className="border-2 border-violet-500 rounded-lg text-gray-200 text-center py-2.5 text-bolt bg-[#535d95]"
          type="text"
          value={busqueda}
          placeholder="Descripcion a Buscar"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="grid rounded-lg bg-indigo-500 text-white py-3 px-2 gap-1.5 font-bold"
        >
          Buscar
        </button>
      </form>

      {busquedaRealizada && (
        <div className="grid rounded-lg  mx-auto lg:w-1/2 md:w-[70%] sm:w-[70%]  ">
          
            <div className="grid gap-2 py-3 px-3 text-gray-300">
              <h1>Datos:</h1>
              {resultados.map((item, index) => (
                <ul key={index} className="grid shadow-lg shadow-cyan-200/50 mb-5 rounded-lg text-gray-300 bg-blue-900  m-1 py-8  p-6 gap-2 font-bold ">
                  <div>Descripcion: {item.descripcion}</div>
                  <div>Correo: {item.correo}</div>
                  <div>Contraseña: {item.contraseña}</div>
                  <div className="grid grid-cols-2 gap-2 w-4/6 mx-auto pt-8">
                    <button
                      type="button"
                      className="border-solid border-2 border-green-300 inline-flex items-center justify-center rounded-xl bg-[#10b981] py-3 px-6 font-dm text-base font-medium text-[#15803d] shadow-lg shadow-[#bef264] transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                      onClick={() => editar(item)}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      className="border-solid border-2 border-red-400/35 inline-flex items-center justify-center rounded-xl bg-red-500/85 py-3 px-6 font-dm text-base font-medium text-white shadow-lg shadow-red-300/75 transition-transform duration-200 ease-in-out hover:scale-[1.02]"
                      onClick={() => eliminar(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </ul>
              ))}
            
          </div>
        </div>
      )}

      {elementoSeleccionado && (
        <div className="grid rounded-lg bg-indigo-500 text-white py-3 px-3 font-bold mx-4">
          <form className="flex flex-col items-center gap-2 pb-5" onSubmit={actualizar}>
            <input
              className="border-2 border-violet-500 rounded-lg text-gray-200 text-center py-2.5 text-bolt bg-[#3b426a]"
              type="text"
              value={elementoSeleccionado.descripcion}
              placeholder="Descripcion"
              onChange={(e) =>
                setElementoSeleccionado({
                  ...elementoSeleccionado,
                  descripcion: e.target.value,
                })
              }
            />
            <input
              className="border-2 border-violet-500 rounded-lg text-gray-200 text-center py-2.5 text-bolt bg-[#3b426a]"
              type="email"
              value={elementoSeleccionado.correo}
              placeholder="Correo"
              onChange={(e) =>
                setElementoSeleccionado({
                  ...elementoSeleccionado,
                  correo: e.target.value,
                })
              }
            />
            <input
              className="border-2 border-violet-500 rounded-lg text-gray-200 text-center py-2.5 text-bolt bg-[#3b426a]"
              type="password"
              value={elementoSeleccionado.contraseña}
              placeholder="Contraseña"
              onChange={(e) =>
                setElementoSeleccionado({
                  ...elementoSeleccionado,
                  contraseña: e.target.value,
                })
              }
            />
            <button
              type="submit"
              className="grid rounded-lg bg-amber-950 text-white py-3 px-2 gap-1.5 font-bold"
            >
              Actualizar
            </button>
          </form>
        </div>
      )}
    </main>
  );
}