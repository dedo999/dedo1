export default function LatestNewsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-red-900/30 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-yellow-500/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4">
            NOTICIAS KAIZEN
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            ¡ENTRENA CON LOS MEJORES!
          </h2>
          <p className="text-xl md:text-2xl text-yellow-400 font-semibold mb-2">
            La academia de artes marciales más completa de Burgos
          </p>
          <p className="text-lg text-gray-300">
            Únete a la familia Kaizen Academy y descubre tu potencial
          </p>
        </div>

        {/* Main Content Card */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-black/80 to-red-900/40 rounded-2xl p-8 border border-red-500/50 backdrop-blur-sm">
            
            {/* Training Programs */}
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                PROGRAMAS DE ENTRENAMIENTO
              </h3>
              <p className="text-gray-300 text-lg">
                Desde principiantes hasta competidores profesionales
              </p>
            </div>

            {/* Disciplines Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              
              {/* MMA */}
              <div className="bg-gradient-to-br from-red-600/20 to-black/50 rounded-xl p-6 border border-red-500/50 hover:border-red-400/70 transition-all duration-300">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-yellow-400 mb-3">MMA</h4>
                  <p className="text-gray-300 mb-4">
                    Artes marciales mixtas con técnicas de striking y grappling
                  </p>
                  <div className="text-sm text-red-400 font-semibold">
                    Lunes, Miércoles, Viernes
                  </div>
                </div>
              </div>

              {/* Brazilian Jiu-Jitsu */}
              <div className="bg-gradient-to-br from-red-600/20 to-black/50 rounded-xl p-6 border border-red-500/50 hover:border-red-400/70 transition-all duration-300">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-yellow-400 mb-3">Brazilian Jiu-Jitsu</h4>
                  <p className="text-gray-300 mb-4">
                    Arte suave brasileño, técnicas de sumisión y defensa personal
                  </p>
                  <div className="text-sm text-red-400 font-semibold">
                    Martes, Jueves, Sábado
                  </div>
                </div>
              </div>

              {/* Kickboxing */}
              <div className="bg-gradient-to-br from-red-600/20 to-black/50 rounded-xl p-6 border border-red-500/50 hover:border-red-400/70 transition-all duration-300">
                <div className="text-center">
                  <h4 className="text-xl font-bold text-yellow-400 mb-3">Kickboxing</h4>
                  <p className="text-gray-300 mb-4">
                    Combinación perfecta de boxeo y patadas para fitness y defensa
                  </p>
                  <div className="text-sm text-red-400 font-semibold">
                    Lunes a Viernes
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-black/50 rounded-lg p-4 text-center border border-red-500/30">
                <div className="text-2xl font-bold text-yellow-400">5+</div>
                <div className="text-sm text-gray-300">Disciplinas</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4 text-center border border-red-500/30">
                <div className="text-2xl font-bold text-yellow-400">10+</div>
                <div className="text-sm text-gray-300">Años Experiencia</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4 text-center border border-red-500/30">
                <div className="text-2xl font-bold text-yellow-400">200+</div>
                <div className="text-sm text-gray-300">Alumnos Activos</div>
              </div>
              <div className="bg-black/50 rounded-lg p-4 text-center border border-red-500/30">
                <div className="text-2xl font-bold text-yellow-400">24/7</div>
                <div className="text-sm text-gray-300">Disponibilidad</div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-red-600/30 to-yellow-500/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/50 mb-6">
                <h4 className="text-2xl font-bold text-white mb-3">
                  ¡Comienza tu transformación hoy!
                </h4>
                <p className="text-gray-200 mb-4">
                  Primera clase gratis para nuevos alumnos. Descubre por qué somos la academia #1 en Burgos.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    const message = encodeURIComponent("¡Hola! Me interesa información sobre las clases de artes marciales en Kaizen Academy. ¿Puedo agendar una clase de prueba?");
                    window.open(`https://wa.me/34662323282?text=${message}`, '_blank');
                  }}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  data-testid="button-clase-gratis"
                >
                  Clase Gratis
                </button>
                <button
                  onClick={() => {
                    const message = encodeURIComponent("Hola, me gustaría obtener información sobre horarios, precios y modalidades de entrenamiento en Kaizen Academy.");
                    window.open(`https://wa.me/34662323282?text=${message}`, '_blank');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  data-testid="button-info-general"
                >
                  Más Información
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-500/20 to-red-600/20 backdrop-blur-sm rounded-full px-6 py-3 border border-yellow-500/30">
            <span className="text-yellow-400 font-bold">
              🥋 ¡Forjando campeones desde 2020! 🥊
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}