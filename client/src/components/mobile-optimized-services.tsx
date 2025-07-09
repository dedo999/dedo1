import { useState } from "react";
import { ChevronRight, Users, Clock, Star } from "lucide-react";

export default function MobileOptimizedServices() {
  const [activeService, setActiveService] = useState<number | null>(null);

  const services = [
    {
      title: "MMA",
      shortDesc: "Artes marciales mixtas completas",
      description: "Artes marciales mixtas combinando striking, grappling y lucha en el suelo. El deporte de combate más completo.",
      tags: ["Principiantes", "Avanzado", "Competición"],
      image: "/mma-image.jpg",
      schedule: "Mar/Jue 20:00-21:30",
      level: "Todos los niveles"
    },
    {
      title: "Kickboxing",
      shortDesc: "Boxeo + patadas para fitness",
      description: "Combina boxeo con patadas. Excelente para fitness, defensa personal y técnica de striking.",
      tags: ["Fitness", "Técnica", "Cardio"],
      image: "/kickboxing-image.webp",
      schedule: "Mar/Jue 20:00-21:30",
      level: "Principiantes"
    },
    {
      title: "Brazilian Jiu-Jitsu",
      shortDesc: "Arte suave, técnica sobre fuerza",
      description: "Arte suave que enfatiza la técnica sobre la fuerza. Ideal para autodefensa y desarrollo mental.",
      tags: ["Gi", "No-Gi", "Self-Defense"],
      image: "/bjj-image-new.webp",
      schedule: "Lun/Mie 19:00-20:30",
      level: "Todos los niveles",
      hasDetailPage: true
    },
    {
      title: "Boxeo",
      shortDesc: "El arte noble de golpear",
      description: "El arte noble de golpear. Desarrolla coordinación, velocidad y potencia en el tren superior.",
      tags: ["Técnica", "Sparring", "Fitness"],
      image: "/boxeo-image.webp",
      schedule: "Mar/Mie/Jue 19:00-20:00",
      level: "Amateur/Pro"
    },
    {
      title: "Jiu Jitsu Kids/Infantil",
      shortDesc: "Para niños 6-12 años",
      description: "Programas especiales de Jiu Jitsu para niños que desarrollan disciplina, respeto y confianza a través del arte suave.",
      tags: ["6-12 años", "Técnica", "Valores"],
      image: "/kids-martial-arts.jpg",
      schedule: "Lun 18:00-19:00",
      level: "Infantil",
      hasKidsPage: true
    }
  ];

  const openWhatsApp = (discipline: string) => {
    const message = encodeURIComponent(`Hola! Me interesa información sobre las clases de ${discipline} en KaizenAcademy Burgos. ¿Podrían contarme sobre horarios y precios? Gracias.`);
    window.open(`https://wa.me/34662323282?text=${message}`, '_blank');
  };

  return (
    <section id="servicios" className="py-12 bg-kaizen-darker">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Nuestras <span className="text-kaizen-red">Disciplinas</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            Descubre el arte marcial que mejor se adapte a ti con nuestros instructores especializados
          </p>
        </div>

        {/* Mobile-first service cards */}
        <div className="space-y-4 sm:grid sm:grid-cols-1 lg:grid-cols-2 sm:gap-6 sm:space-y-0">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-kaizen-dark rounded-lg overflow-hidden shadow-lg border border-gray-700 hover:border-kaizen-red transition-all duration-300"
            >
              {/* Mobile-optimized image */}
              <div className="h-48 sm:h-40 overflow-hidden relative">
                <img 
                  src={service.image}
                  alt={`${service.title} training at Kaizen Burgos`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-kaizen-red text-white px-3 py-1 rounded-full text-sm font-bold">
                    {service.level}
                  </span>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                {/* Title and short description */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{service.shortDesc}</p>
                  
                  {/* Quick info grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-300">
                      <Clock size={16} className="mr-2 text-kaizen-gold" />
                      {service.schedule}
                    </div>
                    <div className="flex items-center text-sm text-gray-300">
                      <Users size={16} className="mr-2 text-kaizen-gold" />
                      Grupos pequeños
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {service.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 bg-kaizen-red/20 text-kaizen-gold text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Expandable description for mobile */}
                {activeService === index && (
                  <div className="mb-4 p-3 bg-kaizen-darker rounded-lg">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setActiveService(activeService === index ? null : index)}
                    className="flex items-center justify-center px-4 py-2 border border-kaizen-gold text-kaizen-gold hover:bg-kaizen-gold hover:text-black transition-all duration-200 rounded-lg text-sm font-medium touch-manipulation"
                  >
                    {activeService === index ? 'Menos info' : 'Más info'}
                    <ChevronRight size={16} className={`ml-2 transition-transform ${activeService === index ? 'rotate-90' : ''}`} />
                  </button>
                  
                  <button
                    onClick={() => openWhatsApp(service.title)}
                    className="flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white transition-all duration-200 rounded-lg text-sm font-medium touch-manipulation flex-1"
                  >
                    Consultar por WhatsApp
                  </button>
                </div>

                {/* Special navigation buttons */}
                {service.hasDetailPage && (
                  <div className="mt-3">
                    <a
                      href="/jiu-jitsu"
                      className="block text-center py-2 px-4 bg-kaizen-red hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-200 touch-manipulation"
                    >
                      Ver página completa BJJ
                    </a>
                  </div>
                )}

                {service.hasKidsPage && (
                  <div className="mt-3">
                    <a
                      href="/jiu-jitsu-kids"
                      className="block text-center py-2 px-4 bg-kaizen-red hover:bg-red-700 text-white rounded-lg text-sm font-medium transition-all duration-200 touch-manipulation"
                    >
                      Ver página infantil
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile-optimized call to action */}
        <div className="mt-8 text-center">
          <div className="bg-kaizen-dark rounded-lg p-6 border border-kaizen-red">
            <h3 className="text-xl font-bold text-white mb-2">
              ¿No sabes cuál elegir?
            </h3>
            <p className="text-gray-300 mb-4 text-sm">
              Primera clase gratis para que pruebes la disciplina que más te guste
            </p>
            <button
              onClick={() => openWhatsApp('todas las disciplinas')}
              className="w-full sm:w-auto bg-kaizen-red hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 text-lg touch-manipulation"
            >
              Consultar todas las opciones
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}