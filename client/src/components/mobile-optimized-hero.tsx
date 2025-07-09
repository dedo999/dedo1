import { useState, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";

export default function MobileOptimizedHero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const openReservationWhatsApp = () => {
    const message = encodeURIComponent("¡Hola! Me interesa información sobre las clases de artes marciales en KaizenAcademy Burgos. ¿Podrían contarme sobre los horarios y precios? Gracias.");
    window.open(`https://wa.me/34662323282?text=${message}`, '_blank');
  };

  const callGym = () => {
    window.location.href = 'tel:+34662323282';
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-kaizen-darker via-kaizen-dark to-black overflow-hidden">
      {/* Background Pattern - Simplified for mobile */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border border-kaizen-red/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 border border-kaizen-gold/20 rounded-full animate-pulse delay-700"></div>
      </div>

      <div className="relative z-10 text-center px-4 py-8 max-w-4xl mx-auto">
        <div className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Mobile-optimized logo and title */}
          <div className="flex flex-col items-center justify-center mb-6">
            <img 
              src="/kaizen_logo_hero.png" 
              alt="KAIZEN Logo"
              className="h-16 sm:h-20 md:h-24 w-auto mb-3"
              loading="eager"
              decoding="async"
            />
            <h1 className="text-xl sm:text-2xl md:text-4xl font-black tracking-tight">
              <span className="text-kaizen-gold">Academy改善Burgos</span>
            </h1>
          </div>

          {/* Mobile-first description */}
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Academia de Artes Marciales<br className="sm:hidden"/>
            <span className="hidden sm:inline"> • </span>MMA • BJJ • Kickboxing • Boxeo<br className="sm:hidden"/>
            <span className="hidden sm:inline"> • </span>Instructores profesionales • Primera clase gratis
          </p>

          {/* Mobile-optimized CTA buttons */}
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center items-center px-2">
            <button
              onClick={openReservationWhatsApp}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 touch-manipulation"
              aria-label="Contactar por WhatsApp"
            >
              <MessageCircle size={24} />
              <span>WhatsApp - Primera Clase Gratis</span>
            </button>
            
            <button
              onClick={callGym}
              className="w-full sm:w-auto bg-kaizen-red hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 text-lg shadow-lg hover:shadow-xl transform hover:scale-105 touch-manipulation"
              aria-label="Llamar al gimnasio"
            >
              <Phone size={24} />
              <span>Llamar: 662 323 282</span>
            </button>
          </div>

          {/* Mobile-optimized quick info */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
            <div className="bg-kaizen-darker/50 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-kaizen-gold font-bold text-lg">5.0⭐</div>
              <div className="text-gray-300 text-sm">Google Reviews</div>
            </div>
            <div className="bg-kaizen-darker/50 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-kaizen-red font-bold text-lg">€40/mes</div>
              <div className="text-gray-300 text-sm">Desde</div>
            </div>
            <div className="bg-kaizen-darker/50 rounded-lg p-4 backdrop-blur-sm">
              <div className="text-white font-bold text-lg">Centro</div>
              <div className="text-gray-300 text-sm">Burgos</div>
            </div>
          </div>
        </div>
      </div>

      {/* Simplified floating elements for mobile */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="animate-bounce text-kaizen-gold">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}