export default function ServicesSection() {
  const services = [
    {
      title: "MMA Burgos",
      description: "Clases de MMA en Burgos - Artes marciales mixtas combinando striking, grappling y lucha en el suelo. El deporte de combate más completo para adultos y jóvenes.",
      tags: ["Principiantes", "Avanzado", "Competición"],
      svgIcon: (
        <div className="w-full h-48 rounded-lg bg-black flex items-center justify-center overflow-hidden">
          <img 
            src="/mma-image.jpg" 
            alt="Clases MMA Burgos - Artes marciales mixtas en KaizenAcademy"
            className="w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      title: "Kickboxing Burgos",
      description: "Clases de kickboxing en Burgos - Combina boxeo con patadas. Excelente para fitness, defensa personal y técnica de striking. Ideal para mujeres y hombres.",
      tags: ["Fitness", "Técnica", "Cardio"],
      svgIcon: (
        <div className="w-full h-48 rounded-lg bg-black flex items-center justify-center overflow-hidden">
          <img 
            src="/kickboxing-image.webp" 
            alt="Clases de kickboxing Burgos - Entrenamientos en KaizenAcademy"
            className="w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      title: "Jiu Jitsu Burgos",
      description: "Clases de jiu jitsu en Burgos - Arte suave que enfatiza la técnica sobre la fuerza. Ideal para autodefensa y desarrollo mental. Brazilian Jiu-Jitsu gi y no-gi.",
      tags: ["Gi", "No-Gi", "Self-Defense"],
      hasDetailPage: true,
      svgIcon: (
        <div className="w-full h-48 rounded-lg bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden shadow-lg">
          <img 
            src="/bjj-image-new.webp" 
            alt="Clases jiu jitsu Burgos - Brazilian Jiu-Jitsu en KaizenAcademy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )
    },
    {
      title: "Boxeo Burgos",
      description: "Clases de boxeo en Burgos - El arte noble de golpear. Desarrolla coordinación, velocidad y potencia en el tren superior. Boxeo profesional y amateur.",
      tags: ["Técnica", "Sparring", "Fitness"],
      svgIcon: (
        <div className="w-full h-48 rounded-lg bg-black flex items-center justify-center overflow-hidden">
          <img 
            src="/boxeo-image.webp" 
            alt="Clases de boxeo Burgos - Entrenamientos profesionales KaizenAcademy"
            className="w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      title: "Artes Marciales para Niños Burgos",
      description: "Clases infantiles de artes marciales en Burgos - Programas especiales de Jiu Jitsu para niños que desarrollan disciplina, respeto y confianza a través del arte suave.",
      tags: ["6-12 años", "Técnica", "Valores"],
      hasKidsPage: true,
      svgIcon: (
        <div className="w-full h-48 rounded-lg bg-black flex items-center justify-center overflow-hidden">
          <img 
            src="/kids-martial-arts.jpg" 
            alt="Artes marciales para niños Burgos - Clases infantiles KaizenAcademy"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )
    }
  ];

  return (
    <section id="servicios" className="py-12 sm:py-16 lg:py-20 bg-kaizen-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 px-2">
            <span className="text-kaizen-red">MMA</span> • <span className="text-kaizen-red">Jiu Jitsu</span> • <span className="text-kaizen-red">Kickboxing</span> • <span className="text-kaizen-red">Boxeo</span> Burgos
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl mx-auto px-4">
            Academia de artes marciales #1 en Burgos. Clases para niños y adultos con instructores certificados. Primera clase gratis.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-kaizen-dark rounded-xl p-4 sm:p-6 lg:p-8 border border-gray-700 hover:border-kaizen-red/50 transition-all duration-300 group"
            >
              <div className="text-center">
                <div className="mb-4 sm:mb-6">
                  {service.svgIcon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 group-hover:text-kaizen-red transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                  {service.description}
                </p>
                <div className="flex justify-center flex-wrap gap-2 text-xs sm:text-sm text-kaizen-gold mb-4 sm:mb-6">
                  {service.tags.map((tag, tagIndex) => (
                    <span key={tagIndex}>• {tag}</span>
                  ))}
                </div>
                {service.hasDetailPage && (
                  <a 
                    href="/about"
                    className="bg-kaizen-gold hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition-all duration-300 inline-block"
                  >
                    Nuestro Fundador
                  </a>
                )}
                {service.hasKidsPage && (
                  <a 
                    href="/bjj-kids"
                    className="bg-kaizen-red hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-300 inline-block"
                  >
                    BJJ Infantil
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
