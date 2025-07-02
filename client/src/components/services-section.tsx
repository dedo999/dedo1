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
      svgIcon: (
        <div className="w-full h-48 rounded-lg bg-black flex items-center justify-center overflow-hidden">
          <img 
            src="/bjj-image-new.webp" 
            alt="Brazilian Jiu-Jitsu training at Kaizen Burgos"
            className="w-full h-full object-cover"
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
      title: "Clases Infantiles",
      description: "Programas especiales para niños que desarrollan disciplina, respeto y confianza a través de artes marciales.",
      tags: ["6-12 años", "Diversión", "Valores"],
      svgIcon: (
        <svg viewBox="0 0 200 150" className="w-full h-48 rounded-lg">
          <rect width="200" height="150" fill="#1a1a1a"/>
          <circle cx="70" cy="50" r="8" fill="#dc2626" opacity="0.8"/>
          <circle cx="130" cy="50" r="8" fill="#dc2626" opacity="0.8"/>
          <rect x="67" y="58" width="6" height="20" fill="#dc2626" opacity="0.6"/>
          <rect x="127" y="58" width="6" height="20" fill="#dc2626" opacity="0.6"/>
          <text x="100" y="130" textAnchor="middle" fill="#eab308" fontSize="12" fontWeight="bold">INFANTILES</text>
        </svg>
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
                <div className="flex justify-center flex-wrap gap-2 text-sm text-kaizen-gold">
                  {service.tags.map((tag, tagIndex) => (
                    <span key={tagIndex}>• {tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
