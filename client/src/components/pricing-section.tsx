import { Check, Star } from "lucide-react";

export default function PricingSection() {
  const pricingPlans = [
    {
      name: "Kickboxing",
      price: "45",
      period: "por mes",
      description: "Dos clases semana más sábados",
      features: [
        "2 clases por semana",
        "Acceso a clases de sábado",
        "Técnicas de striking",
        "Acondicionamiento físico",
        "Asesoramiento personalizado"
      ],
      highlighted: false
    },
    {
      name: "Jiu Jitsu - 2 días",
      price: "50",
      period: "por mes",
      description: "Dos días semana más sábados",
      features: [
        "2 días por semana",
        "Acceso a clases de sábado",
        "Técnicas de grappling",
        "Open mat incluido",
        "Progresión de cinturones"
      ],
      highlighted: false
    },
    {
      name: "Jiu Jitsu - 3 días",
      price: "60",
      period: "por mes",
      description: "Tres días semana más sábados",
      features: [
        "3 días por semana",
        "Acceso a clases de sábado",
        "Técnicas avanzadas",
        "Open mat incluido",
        "Progresión acelerada"
      ],
      highlighted: false
    },
    {
      name: "Jiu Jitsu - 4 días",
      price: "70",
      period: "por mes",
      description: "Cuatro días semana más sábados",
      features: [
        "4 días por semana",
        "Acceso a clases de sábado",
        "Entrenamiento intensivo",
        "Técnicas de competición",
        "Preparación para torneos"
      ],
      highlighted: false
    },
    {
      name: "Boxeo",
      price: "40",
      period: "por mes",
      description: "Tres días semana más sábados",
      features: [
        "3 días por semana",
        "Acceso a clases de sábado",
        "Técnicas de boxeo",
        "Sparring controlado",
        "Acondicionamiento físico"
      ],
      highlighted: false
    },
    {
      name: "MMA",
      price: "40",
      period: "por mes",
      description: "Dos días semana más sábados",
      features: [
        "2 días por semana",
        "Acceso a clases de sábado",
        "Técnicas mixtas",
        "Striking y grappling",
        "Preparación integral"
      ],
      highlighted: false
    },
    {
      name: "Tarifa Plana",
      price: "80",
      period: "por mes",
      description: "Acceso ilimitado a todas las disciplinas",
      features: [
        "Acceso ilimitado a todas las clases",
        "Todas las disciplinas incluidas",
        "Clases matutinas y vespertinas",
        "Open mat y sparring",
        "Flexibilidad total de horarios"
      ],
      highlighted: true
    }
  ];

  return (
    <section id="precios" className="py-20 bg-kaizen-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestros <span className="text-kaizen-red">Precios</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Planes flexibles para todos los niveles. Primera clase gratuita para nuevos estudiantes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index}
              className={`relative rounded-xl p-8 border transition-all duration-300 hover:scale-105 ${
                plan.highlighted 
                  ? 'bg-kaizen-red/10 border-kaizen-red shadow-2xl shadow-kaizen-red/20' 
                  : 'bg-kaizen-darker border-gray-700 hover:border-kaizen-gold/50'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-kaizen-red px-4 py-2 rounded-full text-white text-sm font-bold flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    MÁS POPULAR
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <p className="text-gray-300 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-black text-kaizen-gold">{plan.price}€</span>
                  <span className="text-gray-400 ml-2">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start">
                    <Check className="text-kaizen-gold w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
                className={`w-full py-4 rounded-lg font-bold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-kaizen-red hover:bg-red-700 text-white'
                    : 'border-2 border-kaizen-gold text-kaizen-gold hover:bg-kaizen-gold hover:text-black'
                }`}
              >
                Comenzar Ahora
              </button>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-kaizen-darker rounded-xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">
              <span className="text-kaizen-gold">Primera Clase Gratuita</span> para Nuevos Estudiantes
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              ¿No estás seguro por dónde empezar? Ven a probar cualquiera de nuestras disciplinas completamente gratis. 
              Sin compromisos, solo la oportunidad de experimentar la filosofía Kaizen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:662323282" 
                className="bg-kaizen-red hover:bg-red-700 px-8 py-3 rounded-lg font-bold text-white transition-all duration-300 inline-flex items-center justify-center"
              >
                Reservar Clase Gratuita
              </a>
              <a 
                href="https://wa.me/34662323282?text=Hola,%20me%20gustaría%20información%20sobre%20la%20clase%20gratuita" 
                target="_blank" 
                rel="noopener noreferrer"
                className="border-2 border-kaizen-gold text-kaizen-gold hover:bg-kaizen-gold hover:text-black px-8 py-3 rounded-lg font-bold transition-all duration-300 inline-flex items-center justify-center"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 text-sm mb-4">Métodos de pago aceptados:</p>
          <div className="flex justify-center space-x-6 text-gray-500">
            <span>💳 Efectivo</span>
            <span>🏧 Transferencia</span>
            <span>📱 Bizum</span>
          </div>
        </div>
      </div>
    </section>
  );
}