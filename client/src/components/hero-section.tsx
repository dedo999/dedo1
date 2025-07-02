import { Phone, Calendar } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
          alt="MMA training at Kaizen gym" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-kaizen-darker/90 via-kaizen-darker/70 to-black/60"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
            <span className="text-kaizen-red">KAIZEN</span><br />
            <span className="text-kaizen-gold text-3xl md:text-5xl">SPORTS FIGHT ACADEMY</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto font-light">
            Mejora continua • Excelencia en artes marciales • Burgos
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
          <div className="text-2xl font-bold text-kaizen-gold">5.0★</div>
          <div className="text-sm text-gray-300">Google Reviews</div>
        </div>
        <div className="bg-kaizen-dark/80 backdrop-blur-md px-6 py-4 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-kaizen-red">20+</div>
          <div className="text-sm text-gray-300">Reseñas</div>
        </div>
        <div className="bg-kaizen-dark/80 backdrop-blur-md px-6 py-4 rounded-lg border border-gray-700">
          <div className="text-2xl font-bold text-kaizen-gold">4</div>
          <div className="text-sm text-gray-300">Disciplinas</div>
        </div>
      </div>
    </section>
  );
}
