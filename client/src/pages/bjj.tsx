import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Shield, Medal, Star, Users, Trophy, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

export default function BJJPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    {
      src: "/ruben-bjj-hero.jpeg",
      alt: "Rubén Sancho - Instructor de Jiu Jitsu Brasileño en Kaizen Burgos"
    },
    {
      src: "/ruben-bjj-main.jpeg", 
      alt: "Rubén Sancho entrenando BJJ en Kaizen Burgos"
    },
    {
      src: "/ruben-bjj-1.jpeg",
      alt: "Rubén Sancho - Técnicas de BJJ en Kaizen Burgos"
    },
    {
      src: "/ruben-bjj-2.jpeg",
      alt: "Rubén Sancho - Entrenamiento de Jiu Jitsu"
    },
    {
      src: "/ruben-bjj-3.jpeg",
      alt: "Rubén Sancho - Competición de BJJ"
    },
    {
      src: "/ruben-bjj-4.jpeg",
      alt: "Rubén Sancho - Instructor especializado en BJJ"
    },
    {
      src: "/ruben-bjj-5.jpeg",
      alt: "Rubén Sancho - Cinturón marrón de BJJ"
    },
    {
      src: "/ruben-bjj-6.jpeg",
      alt: "Rubén Sancho - Filosofía del arte suave"
    },
    {
      src: "/ruben-bjj-7.jpeg",
      alt: "Rubén Sancho - Estudiante y competidor de BJJ"
    },
    {
      src: "/ruben-bjj-8.jpeg",
      alt: "Rubén Sancho - Kaizen Burgos BJJ Team"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [images.length]);

  const nextImage = () => {
    setCurrentImageIndex(currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1);
  };

  const prevImage = () => {
    setCurrentImageIndex(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1);
  };

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
                <span className="text-kaizen-gold">Instructor Especializado</span><br />
                Rubén Sancho
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Conoce a Rubén Sancho, instructor especializado en BJJ. 
                Cinturón marrón, competidor activo y apasionado por enseñar el arte suave.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="tel:662323282" 
                  className="bg-kaizen-red hover:bg-red-700 px-8 py-4 rounded-lg font-bold text-white transition-all duration-300 text-center"
                >
                  Reservar Clase Gratuita
                </a>
                <a 
                  href="https://wa.me/34662323282?text=Hola,%20me%20gustaría%20información%20sobre%20las%20clases%20de%20BJJ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-kaizen-gold text-kaizen-gold hover:bg-kaizen-gold hover:text-black px-8 py-4 rounded-lg font-bold transition-all duration-300 text-center"
                >
                  WhatsApp
                </a>
              </div>
            </div>

            {/* Rubén's BJJ Image Slideshow */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-kaizen-red/20 to-kaizen-gold/20 rounded-2xl transform rotate-3"></div>
                <div className="relative w-full h-96 bg-kaizen-dark rounded-2xl shadow-2xl border border-kaizen-gold/30 overflow-hidden">
                  {images.map((image, index) => (
                    <img 
                      key={index}
                      src={image.src} 
                      alt={image.alt}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                        index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  ))}
                  
                  {/* Navigation buttons */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  
                  {/* Dots indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex 
                            ? 'bg-kaizen-gold' 
                            : 'bg-white/50 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instructors Section */}
      <section className="py-20 bg-kaizen-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center">
              <img 
                src="/kaizen_logo_final.png" 
                alt="KaizenAcademy改善Burgos Logo"
                className="h-16 w-auto"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Rubén Sancho - Featured */}
            <div className="lg:col-span-2 bg-gradient-to-br from-kaizen-darker to-kaizen-dark p-8 rounded-xl border border-kaizen-gold/30">
              <div className="flex items-center mb-6">
                <Medal className="w-8 h-8 text-kaizen-gold mr-3" />
                <div>
                  <h3 className="text-3xl font-bold text-white">Rubén Sancho</h3>
                  <p className="text-kaizen-gold font-semibold text-lg">Faixa Marrón / Brown Belt</p>
                </div>
              </div>
              <p className="text-gray-300 mb-6 text-lg">
                Destacado practicante e instructor de Jiu Jitsu Brasileño, Rubén Sancho ha forjado su camino en el tatami a través de una sólida trayectoria como competidor, logrando múltiples podios en campeonatos nacionales tanto en modalidad Gi como No Gi.
              </p>
              <p className="text-gray-300 mb-6">
                Formado bajo la guía de Antonio Alonso, y siguiendo la filosofía aprendida, transmite de forma seria, real y basada en el respeto por el arte marcial. Rubén Sancho no solo transmite técnicas efectivas, sino también los valores profundos del Jiu Jitsu.
              </p>
              <p className="text-gray-300 mb-6">
                Su compromiso con la excelencia, su experiencia en la competencia y su enfoque pedagógico lo convierten en un referente para sus compañeros, ayudando a formar nuevos talentos con una visión disciplinada, honesta y realista del Jiu Jitsu.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="text-white font-bold">Especialización:</h4>
                  <p className="text-sm text-gray-400">• Técnicas de competición</p>
                  <p className="text-sm text-gray-400">• Desarrollo técnico y táctico</p>
                  <p className="text-sm text-gray-400">• Preparación para torneos</p>
                  <p className="text-sm text-gray-400">• Gi y No-Gi</p>
                </div>
                <div className="space-y-3">
                  <h4 className="text-white font-bold">Experiencia:</h4>
                  <p className="text-sm text-gray-400">• Competidor activo nacional</p>
                  <p className="text-sm text-gray-400">• Instructor especializado</p>
                  <p className="text-sm text-gray-400">• Enfoque en progresión técnica</p>
                  <p className="text-sm text-gray-400">• Filosofía del arte suave</p>
                </div>
              </div>
            </div>

            {/* Training Photo */}
            <div className="bg-kaizen-darker rounded-xl border border-gray-800 overflow-hidden">
              <img 
                src="/ruben-bjj-training.jpeg" 
                alt="Rubén Sancho entrenando BJJ en Kaizen Burgos"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Antonio Alonso - Supporting */}
          <div className="mt-12 bg-kaizen-darker p-6 rounded-xl border border-gray-800">
            <div className="flex items-center mb-4">
              <Shield className="w-6 h-6 text-kaizen-red mr-3" />
              <div>
                <h4 className="text-xl font-bold text-white">Bajo la mentoría de Antonio Alonso</h4>
                <p className="text-kaizen-gold">BJJ Maestro - Faixa Preta / Black Belt</p>
              </div>
            </div>
            <p className="text-gray-300">
              Maestro pionero del BJJ en Castilla y León con más de 45 años de experiencia. 
              Cinturón Negro 4° Grado del Peposo Fight Team de Brasil.
            </p>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-20 bg-kaizen-darker">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Rubén en <span className="text-kaizen-gold">Acción</span>
            </h2>
            <p className="text-lg text-gray-300">
              Técnicas, entrenamiento y competición de nuestro instructor de BJJ
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.slice(2).map((image, index) => (
              <div key={index} className="bg-kaizen-dark rounded-lg overflow-hidden border border-gray-800 hover:border-kaizen-gold/50 transition-all duration-300 group">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BJJ Benefits */}
      <section className="py-20 bg-kaizen-darker">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Beneficios del <span className="text-kaizen-red">Jiu Jitsu</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-kaizen-dark p-8 rounded-xl border border-gray-800">
              <Target className="w-12 h-12 text-kaizen-red mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Técnica y Estrategia</h3>
              <p className="text-gray-300">
                El Brazilian Jiu-Jitsu desarrolla habilidades técnicas refinadas y pensamiento estratégico aplicable dentro y fuera del tatami.
              </p>
            </div>

            <div className="bg-kaizen-dark p-8 rounded-xl border border-gray-800">
              <Users className="w-12 h-12 text-kaizen-gold mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Comunidad y Respeto</h3>
              <p className="text-gray-300">
                Únete a una comunidad basada en el respeto mutuo, la humildad y el crecimiento personal continuo.
              </p>
            </div>

            <div className="bg-kaizen-dark p-8 rounded-xl border border-gray-800">
              <Trophy className="w-12 h-12 text-kaizen-red mb-4" />
              <h3 className="text-xl font-bold text-white mb-4">Preparación para Competición</h3>
              <p className="text-gray-300">
                Entrena con técnicas de alto nivel para competiciones locales, nacionales e internacionales.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing for BJJ */}
      <section className="py-20 bg-kaizen-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Planes de <span className="text-kaizen-gold">BJJ</span>
            </h2>
            <p className="text-lg text-gray-300">
              Elige el plan que mejor se adapte a tu ritmo de entrenamiento
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Combinar 2 disciplinas */}
            <div className="bg-kaizen-gold/10 p-8 rounded-xl border border-kaizen-gold">
              <h3 className="text-2xl font-bold text-white mb-2">Combinar 2 disciplinas</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-kaizen-gold">60€</span>
                <span className="text-gray-400 ml-2">por mes</span>
              </div>
              <p className="text-gray-300 mb-6">BJJ + otra disciplina</p>
              <ul className="space-y-2 text-gray-300">
                <li>• Elige BJJ + 1 más</li>
                <li>• Flexibilidad de horarios</li>
                <li>• Acceso a clases de sábado</li>
                <li>• Entrenamiento completo</li>
              </ul>
            </div>

            {/* 2 días */}
            <div className="bg-kaizen-darker p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-2">BJJ - 2 días</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-kaizen-gold">50€</span>
                <span className="text-gray-400 ml-2">por mes</span>
              </div>
              <p className="text-gray-300 mb-6">Dos días semana más sábados</p>
              <ul className="space-y-2 text-gray-300">
                <li>• 2 días por semana</li>
                <li>• Acceso a clases de sábado</li>
                <li>• Open mat incluido</li>
                <li>• Progresión de cinturones</li>
              </ul>
            </div>

            {/* 3 días */}
            <div className="bg-kaizen-red/10 p-8 rounded-xl border border-kaizen-red">
              <div className="text-center mb-4">
                <span className="bg-kaizen-red px-3 py-1 rounded-full text-white text-sm font-bold">
                  MÁS POPULAR
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">BJJ - 3 días</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-kaizen-gold">60€</span>
                <span className="text-gray-400 ml-2">por mes</span>
              </div>
              <p className="text-gray-300 mb-6">Tres días semana más sábados</p>
              <ul className="space-y-2 text-gray-300">
                <li>• 3 días por semana</li>
                <li>• Acceso a clases de sábado</li>
                <li>• Técnicas avanzadas</li>
                <li>• Progresión acelerada</li>
              </ul>
            </div>

            {/* 4 días */}
            <div className="bg-kaizen-darker p-8 rounded-xl border border-gray-800">
              <h3 className="text-2xl font-bold text-white mb-2">BJJ - 4 días</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-kaizen-gold">70€</span>
                <span className="text-gray-400 ml-2">por mes</span>
              </div>
              <p className="text-gray-300 mb-6">Cuatro días semana más sábados</p>
              <ul className="space-y-2 text-gray-300">
                <li>• 4 días por semana</li>
                <li>• Entrenamiento intensivo</li>
                <li>• Técnicas de competición</li>
                <li>• Preparación para torneos</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-300 mb-6">
              ¿Primera vez? ¡Tu primera clase es completamente gratuita!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:662323282" 
                className="bg-kaizen-red hover:bg-red-700 px-8 py-3 rounded-lg font-bold text-white transition-all duration-300"
              >
                Reservar Clase Gratuita
              </a>
              <a 
                href="https://wa.me/34662323282?text=¡Hola%20KaizenAcademy改善Burgos!%20🥋%0A%0AEstoy%20interesado/a%20en%20las%20clases%20de%20Brazilian%20Jiu-Jitsu.%0A%0A¿Podrían%20informarme%20sobre:%0A•%20Horarios%20de%20BJJ%0A•%20Precios%20y%20planes%20disponibles%0A•%20Mi%20clase%20gratuita%20de%20prueba%0A•%20Nivel%20para%20principiantes%0A%0A¡Espero%20su%20respuesta!"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-kaizen-gold text-kaizen-gold hover:bg-kaizen-gold hover:text-black px-8 py-3 rounded-lg font-bold transition-all duration-300"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}