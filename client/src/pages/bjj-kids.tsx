import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Users, Heart, Shield, Award, Brain, Target } from "lucide-react";

export default function BJJKidsPage() {
  return (
    <div className="min-h-screen bg-kaizen-darker text-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 bg-gradient-to-br from-kaizen-dark to-kaizen-darker">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <span className="text-kaizen-gold">Jiu Jitsu</span><br />
                Kids/Infantil
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                ¡Tu hijo/a crecerá con cada clase! Los niños que practican Jiu-Jitsu brasileño mejoran la fuerza, la coordinación, la agilidad y la flexibilidad de una manera divertida, amistosa e interactiva.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:662323282" 
                  className="bg-kaizen-red hover:bg-red-700 px-8 py-4 rounded-lg font-bold text-white transition-all duration-300 text-center"
                >
                  Clase de Prueba Gratuita
                </a>
                <a 
                  href="https://wa.me/34662323282?text=Hola,%20me%20gustaría%20información%20sobre%20las%20clases%20de%20BJJ%20para%20niños"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-kaizen-gold text-kaizen-gold hover:bg-kaizen-gold hover:text-black px-8 py-4 rounded-lg font-bold transition-all duration-300 text-center"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Image */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-kaizen-red/20 to-kaizen-gold/20 rounded-2xl transform rotate-3"></div>
                <div className="relative w-full h-96 bg-kaizen-dark rounded-2xl shadow-2xl border border-kaizen-gold/30 overflow-hidden">
                  <img 
                    src="/kids-martial-arts.jpg" 
                    alt="Jiu Jitsu para niños en Kaizen Burgos"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Message Section */}
      <section className="py-20 bg-kaizen-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ¡Tu hijo/a crecerá con <span className="text-kaizen-gold">cada clase!</span>
          </h2>
          <p className="text-lg text-gray-300 mb-8 leading-relaxed">
            Los niños son como esponjas. Absorben las cosas rápida y fácilmente. De hecho, los padres a veces pueden ver una diferencia en sus hijos después de una sola clase de Jiu Jitsu. Cada clase adicional a la que asisten aumenta su conocimiento y crecimiento.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            No solo se vuelven más saludables a medida que aprenden artes marciales, sino que también aprenden el valor de la disciplina y el respeto. Cuando inscribe a su hijo en una clase de Jiu Jitsu, le está dando mucho más que habilidades físicas. Le estás dando la oportunidad de prosperar en todas las áreas de su vida.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-kaizen-darker">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Desarrollo <span className="text-kaizen-red">Integral</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              El Jiu Jitsu promueve el desarrollo individual y el crecimiento personal, así como el respeto, la integridad y el compromiso de modo que hay un equilibrio entre la parte física y la mental.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-kaizen-dark p-8 rounded-xl border border-gray-800">
              <Users className="w-12 h-12 text-kaizen-gold mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Desarrollo Físico</h3>
              <p className="text-gray-300">
                Mejora de la fuerza, coordinación, agilidad y flexibilidad de una manera divertida, amistosa e interactiva.
              </p>
            </div>

            <div className="bg-kaizen-dark p-8 rounded-xl border border-gray-800">
              <Brain className="w-12 h-12 text-kaizen-red mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Desarrollo Mental</h3>
              <p className="text-gray-300">
                Promoción del desarrollo individual y crecimiento personal a través de valores fundamentales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-kaizen-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Valores <span className="text-kaizen-gold">Fundamentales</span>
            </h2>
            <p className="text-lg text-gray-300">
              Estos son algunos de los valores centrales que inculcamos en el entrenamiento del Jiu Jitsu:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Self-Awareness */}
            <div className="bg-kaizen-darker p-6 rounded-xl border border-gray-800">
              <Target className="w-10 h-10 text-kaizen-gold mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">1. Conciencia de uno mismo</h3>
              <p className="text-gray-300 text-sm">
                La autoconciencia es uno de los valores fundamentales que los niños comienzan a desarrollar a través del Jiu Jitsu. Con el tiempo, aprenden sobre sus habilidades, a aplicar lo que han aprendido y trabajan en sus fortalezas y debilidades.
              </p>
            </div>

            {/* Respect */}
            <div className="bg-kaizen-darker p-6 rounded-xl border border-gray-800">
              <Heart className="w-10 h-10 text-kaizen-red mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">2. Respeto</h3>
              <p className="text-gray-300 text-sm">
                En el BJJ, enseñamos a nuestros alumnos el valor de respetar a los demás así como a ellos mismos. Las clases basadas en el respeto animan a los niños a practicar habilidades esenciales para la vida.
              </p>
            </div>

            {/* Discipline */}
            <div className="bg-kaizen-darker p-6 rounded-xl border border-gray-800">
              <Award className="w-10 h-10 text-kaizen-gold mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">3. Disciplina</h3>
              <p className="text-gray-300 text-sm">
                Otro valor central enfatizado en el BJJ es la disciplina. El entrenamiento del Jiu-Jitsu no es fácil, y la mejora no ocurre sin trabajo duro y esfuerzo. Los estudiantes deben tener la disciplina para seguir practicando.
              </p>
            </div>

            {/* Responsibility */}
            <div className="bg-kaizen-darker p-6 rounded-xl border border-gray-800">
              <Users className="w-10 h-10 text-kaizen-red mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">4. Responsabilidad</h3>
              <p className="text-gray-300 text-sm">
                Los niños aprenden la importancia de la responsabilidad a través de la disciplina y el establecimiento de metas. Aprenden que para lograr algo en su entrenamiento de artes marciales, deben asumir la responsabilidad.
              </p>
            </div>

            {/* Anti-bullying */}
            <div className="bg-kaizen-darker p-6 rounded-xl border border-gray-800 md:col-span-2 lg:col-span-1">
              <Shield className="w-10 h-10 text-kaizen-gold mb-4" />
              <h3 className="text-lg font-bold text-white mb-3">5. Anti-bullying</h3>
              <p className="text-gray-300 text-sm">
                Aprender habilidades de defensa personal a través del BJJ es una forma en la que los niños pueden aprender a lidiar con los acosadores. BJJ enseña a mantener el control y a pensar bajo presión.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Age Groups & Pricing */}
      <section className="py-20 bg-kaizen-darker">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Programa <span className="text-kaizen-gold">Infantil</span>
            </h2>
            <p className="text-lg text-gray-300">
              Clases especializadas por edades para un aprendizaje óptimo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Ages 6-8 */}
            <div className="bg-kaizen-dark p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-4">6-8 años</h3>
              <p className="text-gray-300 mb-6">
                Introducción al Jiu Jitsu a través de juegos y actividades divertidas. Enfoque en coordinación básica y valores fundamentales.
              </p>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>• Movimientos básicos y coordinación</li>
                <li>• Juegos de equilibrio y agilidad</li>
                <li>• Valores de respeto y disciplina</li>
                <li>• Desarrollo de la confianza</li>
              </ul>
              <div className="text-center">
                <span className="text-2xl font-bold text-kaizen-gold">35€/mes</span>
              </div>
            </div>

            {/* Ages 9-12 */}
            <div className="bg-kaizen-red/10 p-8 rounded-xl border border-kaizen-red">
              <div className="text-center mb-4">
                <span className="bg-kaizen-red px-3 py-1 rounded-full text-white text-sm font-bold">
                  RECOMENDADO
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">9-12 años</h3>
              <p className="text-gray-300 mb-6">
                Técnicas más avanzadas de Jiu Jitsu con énfasis en competición amistosa y desarrollo del carácter.
              </p>
              <ul className="space-y-2 text-gray-300 mb-6">
                <li>• Técnicas fundamentales de BJJ</li>
                <li>• Introducción a la competición</li>
                <li>• Defensa personal básica</li>
                <li>• Liderazgo y responsabilidad</li>
              </ul>
              <div className="text-center">
                <span className="text-2xl font-bold text-kaizen-gold">40€/mes</span>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 mb-6">
              ¡Primera clase completamente gratuita para que tu hijo/a descubra el Jiu Jitsu!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:662323282" 
                className="bg-kaizen-red hover:bg-red-700 px-8 py-3 rounded-lg font-bold text-white transition-all duration-300"
              >
                Reservar Clase Gratuita
              </a>
              <a 
                href="https://wa.me/34662323282?text=¡Hola%20KaizenAcademy改善Burgos!%20👶🥋%0A%0AEstoy%20interesado/a%20en%20las%20clases%20de%20Brazilian%20Jiu-Jitsu%20para%20niños.%0A%0A¿Podrían%20informarme%20sobre:%0A•%20Horarios%20para%20niños%0A•%20Precios%20y%20planes%20(40€/mes)%0A•%20Clase%20gratuita%20de%20prueba%0A•%20Edades%20y%20grupos%20disponibles%0A•%20Metodología%20para%20pequeños%0A%0AMi%20hijo/a%20tiene%20____%20años.%0A%0A¡Gracias!"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-kaizen-gold text-kaizen-gold hover:bg-kaizen-gold hover:text-black px-8 py-3 rounded-lg font-bold transition-all duration-300"
              >
                Información Completa
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-kaizen-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ayuda a tu hijo/a a <span className="text-kaizen-gold">prosperar</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Dale la oportunidad de crecer en todas las áreas de su vida a través del Jiu Jitsu
          </p>
          <div className="bg-kaizen-darker p-8 rounded-xl border border-kaizen-gold/30">
            <h3 className="text-xl font-bold text-kaizen-gold mb-4">¿Por qué elegir Kaizen para tu hijo/a?</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div>
                <p className="text-gray-300">• Instructores especializados en enseñanza infantil</p>
                <p className="text-gray-300">• Ambiente seguro y familiar</p>
                <p className="text-gray-300">• Clases adaptadas por edades</p>
              </div>
              <div>
                <p className="text-gray-300">• Valores tradicionales del Jiu Jitsu</p>
                <p className="text-gray-300">• Desarrollo integral físico y mental</p>
                <p className="text-gray-300">• Primera clase gratuita</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}