import { useState, useEffect } from "react";

const supabaseUrl = "https://glxjuubfbueivfedkuzz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdseGp1dWJmYnVlaXZmZWRrdXp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM0ODg4NTQsImV4cCI6MjAyOTA2NDg1NH0.uBI5fP-F9nJ9_hMeoDKzp1yBWgRCXgrLyBM5YwPceyw";

function fetchData() {
  const [consulta, setConsulta] = useState(null);

  useEffect(() => {
    fetch(supabaseUrl, supabaseKey);
  }, [])
    .then((Response) => Response.json())
    .then((data) => setConsulta(data));


console.log(consulta)

  return (
    <div className="flex flex-col justify-center items-center">
      <h1>Busca por Descripcion</h1>
      <input
        className="border-2 border-violet-500 rounded-lg text-gray-200 text-center py-3 px-14 text-bolt bg-[#3b426a] hover:bg-violet-600"
        type="text"
      />

      <button
        className="border-2 border-violet-500 rounded-lg text-gray-200 text-center py-3 px-14 text-bolt bg-[#3b426a] hover:bg-violet-600"
        type="submit"
      >
        Buscar
      </button>
    </div>
  );
}

export default fetchData;
