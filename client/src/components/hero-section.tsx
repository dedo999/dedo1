import { Phone, Calendar } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full object-cover" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="heroGrad" cx="50%" cy="50%" r="70%">
              <stop offset="0%" stopColor="#1a1a1a" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#0a0a0a" stopOpacity="0.9"/>
            </radialGradient>
          </defs>
          <rect width="1920" height="1080" fill="#0a0a0a"/>
          <circle cx="300" cy="300" r="80" fill="#dc2626" opacity="0.2"/>
          <circle cx="1600" cy="200" r="60" fill="#eab308" opacity="0.2"/>
          <circle cx="200" cy="800" r="70" fill="#dc2626" opacity="0.15"/>
          <circle cx="1700" cy="900" r="50" fill="#eab308" opacity="0.15"/>
          <rect x="800" y="400" width="320" height="280" fill="#1a1a1a" opacity="0.3" rx="10"/>
          <rect width="1920" height="1080" fill="url(#heroGrad)"/>
        </svg>
        <div className="absolute inset-0 bg-gradient-to-r from-kaizen-darker/90 via-kaizen-darker/70 to-black/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="mb-8">
            <img 
              src="/kaizen-logo-transparent.png" 
              alt="Kaizen Logo"
              className="h-24 md:h-32 w-auto mx-auto"
            />
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-kaizen-gold mb-6 tracking-tight">
            SPORTS FIGHT ACADEMY
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-light">
            <strong>Mejor gimnasio artes marciales Burgos</strong> • MMA, BJJ, Kickboxing, Boxeo • Instructores profesionales • Primera clase gratis
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-kaizen-red hover:bg-red-700 px-8 py-4 rounded-lg font-bold text-lg text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center"
            >
              <Calendar className="mr-2" size={20} />
              Reserva tu Clase Gratis
            </button>
            <a 
              href="tel:662323282" 
              className="border-2 border-kaizen-gold text-kaizen-gold hover:bg-kaizen-gold hover:text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <Phone className="mr-2" size={20} />
              662 323 282
            </a>
          </div>
        </div>
      </div>

      {/* Floating stats */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden lg:flex space-x-8 text-center">
        <div className="bg-kaizen-dark/80 backdrop-blur-md px-6 py-4 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-kaizen-gold">5.0⭐</div>
          <div className="text-sm text-gray-300">Valoración</div>
        </div>
        <div className="bg-kaizen-dark/80 backdrop-blur-md px-6 py-4 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-kaizen-red">100%</div>
          <div className="text-sm text-gray-300">Satisfacción</div>
        </div>
        <div className="bg-kaizen-dark/80 backdrop-blur-md px-6 py-4 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-kaizen-gold">5</div>
          <div className="text-sm text-gray-300">Disciplinas</div>
        </div>
      </div>
    </section>
  );
}
