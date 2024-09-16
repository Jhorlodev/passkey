export default function LoginButton() {
    return (
      <a href="/login"> 
        <button
          className='flex items-center cursor-pointer gap-2 rounded-lg px-3 py-[10px] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-button text-white shadow-button hover:shadow-button-hover hover:scale-110 ml-auto font-medium shadow-sm shadow-purple-900/50 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 w-44' >
          Iniciar Sesión
        </button>
      </a>
    );
  }
  