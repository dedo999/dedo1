export default function ServicesSection() {
  const services = [
    {
      title: "MMA",
      description: "Artes marciales mixtas combinando striking, grappling y lucha en el suelo. El deporte de combate más completo.",
      tags: ["Principiantes", "Avanzado", "Competición"],
      svgIcon: (
        <div className="w-full h-48 rounded-lg bg-black flex items-center justify-center overflow-hidden">
          <img 
            src="/mma-image.jpg" 
            alt="MMA training at Kaizen Burgos"
            className="w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      title: "Kickboxing",
      description: "Combina boxeo con patadas. Excelente para fitness, defensa personal y técnica de striking.",
      tags: ["Fitness", "Técnica", "Cardio"],
      svgIcon: (
        <div className="w-full h-48 rounded-lg bg-black flex items-center justify-center overflow-hidden">
          <img 
            src="/kickboxing-image.webp" 
            alt="Kickboxing training at Kaizen Burgos"
            className="w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      title: "Brazilian Jiu-Jitsu",
      description: "Arte suave que enfatiza la técnica sobre la fuerza. Ideal para autodefensa y desarrollo mental.",
      tags: ["Gi", "No-Gi", "Self-Defense"],
      hasDetailPage: true,
      svgIcon: (
        <div className="w-full h-48 rounded-lg bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden shadow-lg">
          <img 
            src="/bjj-image-new.webp" 
            alt="Brazilian Jiu-Jitsu training at Kaizen Burgos"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )
    },
    {
      title: "Boxeo",
      description: "El arte noble de golpear. Desarrolla coordinación, velocidad y potencia en el tren superior.",
      tags: ["Técnica", "Sparring", "Fitness"],
      svgIcon: (
        <div className="w-full h-48 rounded-lg bg-black flex items-center justify-center overflow-hidden">
          <img 
            src="/boxeo-image.webp" 
            alt="Boxeo training at Kaizen Burgos"
            className="w-full h-full object-cover"
          />
        </div>
      )
    },
    {
      title: "Jiu Jitsu Kids/Infantil",
      description: "Programas especiales de Jiu Jitsu para niños que desarrollan disciplina, respeto y confianza a través del arte suave.",
      tags: ["6-12 años", "Técnica", "Valores"],
      hasKidsPage: true,
      svgIcon: (
        <div className="w-full h-48 rounded-lg bg-black flex items-center justify-center overflow-hidden">
          <img 
            src="/kids-martial-arts.jpg" 
            alt="Jiu Jitsu Kids Kaizen Burgos - BJJ training for children"
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )
    }
  ];

  return (
    <section id="servicios" className="py-20 bg-kaizen-darker">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestras <span className="text-kaizen-red">Disciplinas</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Descubre el arte marcial que mejor se adapte a ti con nuestros instructores especializados
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-kaizen-dark rounded-xl p-8 border border-gray-700 hover:border-kaizen-red/50 transition-all duration-300 group"
            >
              <div className="text-center">
                <div className="mb-6">
                  {service.svgIcon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-kaizen-red transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-300 mb-6">
                  {service.description}
                </p>
                <div className="flex justify-center flex-wrap gap-2 text-sm text-kaizen-gold mb-6">
                  {service.tags.map((tag, tagIndex) => (
                    <span key={tagIndex}>• {tag}</span>
                  ))}
                </div>
                {service.hasDetailPage && (
                  <a 
                    href="/about"
                    className="bg-kaizen-gold hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded-lg transition-all duration-300 inline-block"
                  >
                    Conoce a Antonio Alonso
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
