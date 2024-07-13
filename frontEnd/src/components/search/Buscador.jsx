
export default function Buscador() {
  return (
    <form class="form relative">
      <div class="relative justify-center">
        <button class="absolute inset-y-[18px] left-2 flex items-center p-1">
          <i class="fas fa-search text-[#9ca3af] w-5 h-5"></i>
        </button>
        <input
          class="w-80 max-w-80 h-10 input rounded-2xl pl-10 pr-3 py-4 border-2 border-darkBlue focus:outline-none focus:border-blue-500 placeholder-gray-400 transition-all duration-300 shadow-md"
          placeholder="Buscar..."
          required=""
          type="text"
        />
      </div>
    </form>

  )
}

