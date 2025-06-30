export default function ServicesSection() {
  const services = [
    {
      title: "MMA",
      description: "Artes marciales mixtas combinando striking, grappling y lucha en el suelo. El deporte de combate más completo.",
      tags: ["Principiantes", "Avanzado", "Competición"],
      image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Kickboxing",
      description: "Combina boxeo con patadas. Excelente para fitness, defensa personal y técnica de striking.",
      tags: ["Fitness", "Técnica", "Cardio"],
      image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Brazilian Jiu-Jitsu",
      description: "Arte suave que enfatiza la técnica sobre la fuerza. Ideal para autodefensa y desarrollo mental.",
      tags: ["Gi", "No-Gi", "Self-Defense"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      title: "Boxeo",
      description: "El arte noble de golpear. Desarrolla coordinación, velocidad y potencia en el tren superior.",
      tags: ["Técnica", "Sparring", "Fitness"],
      image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Karate",
      description: "Arte marcial tradicional que desarrolla disciplina, respeto y técnicas de golpeo lineales.",
      tags: ["Katas", "Kumite", "Tradicional"],
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2340&q=80"
    },
    {
      title: "Clases Infantiles",
      description: "Programas especiales para niños que desarrollan disciplina, respeto y confianza.",
      tags: ["6-12 años", "Diversión", "Valores"],
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
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
                <img 
                  src={service.image}
                  alt={`${service.title} training session`}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
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
