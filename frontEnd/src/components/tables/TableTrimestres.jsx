import React from 'react'

export default function TableTrimestres () {
  return (
  
      <main className="bg-white rounded-xl py-7 px-3 w-full overflow-y-hidden">
        {/*BUSCADOR Y MÁS */}

        <header>
          <div className="max-w-80 px-2 py-3 border rounded-xl border-darkBlue flex gap-2 items-center">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input type="text" className="w-full" />
          </div>
        </header>

        <section className="max-h-[80vh] overflow-y-scroll">
          {/* HEADER TABLA */}
          <div className="sticky top-0 lg:grid grid-cols-[150px_minmax(350px,_1fr)_minmax(250px,_1fr)_repeat(2,_minmax(100px,_1fr))] gap-x-3 text-paragraph font-cocogooseLight text-darkBlue p-5 border-b-2 border-b-placeholderBlue hidden">
            <p>No°</p>
            <p>Trimestre</p>
            <p>Fecha inicio</p>
            <p>Fecha final</p>
            <p>Estado</p>
          </div>
          {/*CUERPO DE LA TABLA */}

       
        </section>
      </main>
  )
}
