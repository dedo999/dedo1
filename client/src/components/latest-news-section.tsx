import { Link } from "wouter";
import fighterImage1 from "@assets/ScreenShot Tool -20250913190644_1757783437418.png";
import fighterImage2 from "@assets/ScreenShot Tool -20250913190620_1757783437423.png";

export default function LatestNewsSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-red-900/30 to-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-yellow-500/10"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Breaking News Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
            🔴 EN VIVO · ÚLTIMAS NOTICIAS
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            ¡HISTORIA EN BURGOS!
          </h2>
          <p className="text-xl md:text-2xl text-yellow-400 font-semibold mb-2">
            Primer evento profesional de MMA en nuestra ciudad
          </p>
          <p className="text-lg text-gray-300">
            Nuestros luchadores de Kaizen Academy harán historia el 20 de septiembre
          </p>
        </div>

        {/* Main Event Card */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-black/80 to-red-900/40 rounded-2xl p-8 border border-red-500/50 backdrop-blur-sm">
            
            {/* Event Header */}
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">
                KOMBAT GAMES BURGOS 2025
              </h3>
              <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-lg">
                <div className="bg-red-600/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-red-500/30">
                  📅 <strong className="text-yellow-400">Viernes 20 Septiembre</strong>
                </div>
                <div className="bg-red-600/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-red-500/30">
                  🥊 <strong className="text-yellow-400">Primer evento MMA en Burgos</strong>
                </div>
              </div>
            </div>

            {/* Fighters Showcase */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              
              {/* Álvar Romero */}
              <div className="bg-black/50 rounded-xl p-6 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={fighterImage1} 
                    alt="Álvar Romero - Kaizen Burgos"
                    className="w-20 h-20 rounded-full object-cover border-2 border-yellow-400"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-yellow-400">ÁLVAR ROMERO</h4>
                    <p className="text-red-400 font-semibold">🥋 Kaizen Academy</p>
                    <p className="text-gray-300">vs Icaro Bruno Sousa</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-red-600/20 to-yellow-500/10 rounded-lg p-3">
                  <p className="text-white font-semibold">Welterweight MMA Bout</p>
                </div>
              </div>

              {/* Álex Calvo */}
              <div className="bg-black/50 rounded-xl p-6 border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300">
                <div className="flex items-center gap-4 mb-4">
                  <img 
                    src={fighterImage2} 
                    alt="Álex Calvo - Kaizen Burgos"
                    className="w-20 h-20 rounded-full object-cover border-2 border-yellow-400"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-yellow-400">ÁLEX CALVO</h4>
                    <p className="text-red-400 font-semibold">🥋 Kaizen Academy</p>
                    <p className="text-gray-300">vs Riqui Andrés Santana</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-red-600/20 to-yellow-500/10 rounded-lg p-3">
                  <p className="text-white font-semibold">Catchweight MMA - 75KG</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-red-600/30 to-yellow-500/20 backdrop-blur-sm rounded-xl p-6 border border-red-500/50 mb-6">
                <h4 className="text-2xl font-bold text-white mb-3">
                  ¡Sé parte de la historia!
                </h4>
                <p className="text-gray-200 mb-4">
                  Dos luchadores de nuestra academia representarán a Burgos en el primer evento profesional de MMA. 
                  ¡No te pierdas este momento histórico!
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/eventos"
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  data-testid="button-ver-evento-completo"
                >
                  🎟️ Ver Evento Completo
                </Link>
                <button
                  onClick={() => {
                    const message = encodeURIComponent("¡Hola! Me interesa información sobre el evento Kombat Games Burgos del 20 de septiembre con los luchadores de Kaizen Academy. ¿Cómo puedo conseguir entradas?");
                    window.open(`https://wa.me/34662323282?text=${message}`, '_blank');
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
                  data-testid="button-info-entradas"
                >
                  💬 Info & Entradas
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center bg-gradient-to-r from-yellow-500/20 to-red-600/20 backdrop-blur-sm rounded-full px-6 py-3 border border-yellow-500/30">
            <span className="text-yellow-400 font-bold">
              ⭐ Entrena con los métodos que llevan a nuestros atletas al éxito profesional
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}