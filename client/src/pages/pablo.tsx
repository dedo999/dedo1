import { Calendar, Medal, Trophy, Target, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import pabloImage from "@assets/WhatsApp Image 2025-07-06 at 2.52.00 PM_1751808825522.jpeg";
import pabloImage1 from "@assets/WhatsApp Image 2025-07-06 at 4.10.31 PM_1751811273951.jpeg";
import pabloImage2 from "@assets/WhatsApp Image 2025-07-06 at 4.10.31 PM (1)_1751811273950.jpeg";
import pabloImage3 from "@assets/WhatsApp Image 2025-07-06 at 4.10.31 PM (2)_1751811273950.jpeg";
import pabloImage4 from "@assets/WhatsApp Image 2025-07-06 at 4.10.31 PM (3)_1751811273949.jpeg";
import pabloImage5 from "@assets/WhatsApp Image 2025-07-06 at 4.10.31 PM (4)_1751811273948.jpeg";
import pabloImage6 from "@assets/WhatsApp Image 2025-07-06 at 4.10.32 PM_1751811273948.jpeg";
import pabloImage7 from "@assets/WhatsApp Image 2025-07-06 at 4.10.32 PM (1)_1751811273947.jpeg";
import pabloImage8 from "@assets/WhatsApp Image 2025-07-06 at 4.10.32 PM (2)_1751811273947.jpeg";
import pabloImage9 from "@assets/WhatsApp Image 2025-07-06 at 4.10.32 PM (3)_1751811273946.jpeg";
import pabloImage10 from "@assets/WhatsApp Image 2025-07-06 at 4.10.33 PM_1751811273945.jpeg";
import pabloImage11 from "@assets/WhatsApp Image 2025-07-06 at 4.10.33 PM (1)_1751811248696.jpeg";
import pabloImage12 from "@assets/WhatsApp Image 2025-07-06 at 4.10.33 PM (2)_1751811248696.jpeg";
import pabloImage13 from "@assets/WhatsApp Image 2025-07-06 at 4.10.33 PM (3)_1751811248696.jpeg";
import pabloImage14 from "@assets/WhatsApp Image 2025-07-06 at 4.10.34 PM_1751811248695.jpeg";
import pabloImage15 from "@assets/WhatsApp Image 2025-07-06 at 4.10.35 PM_1751811248695.jpeg";
import pabloImage16 from "@assets/WhatsApp Image 2025-07-06 at 4.10.35 PM (1)_1751811248694.jpeg";
import pabloImage17 from "@assets/WhatsApp Image 2025-07-06 at 4.10.35 PM (2)_1751811248694.jpeg";
import pabloImage18 from "@assets/WhatsApp Image 2025-07-06 at 4.10.36 PM_1751811248693.jpeg";
import pabloImage19 from "@assets/WhatsApp Image 2025-07-06 at 4.10.36 PM (1)_1751811248693.jpeg";
import pabloImage20 from "@assets/WhatsApp Image 2025-07-06 at 4.10.36 PM (2)_1751811248692.jpeg";
import pabloImage21 from "@assets/WhatsApp Image 2025-07-06 at 4.10.23 PM (1)_1751811384443.jpeg";
import pabloImage22 from "@assets/WhatsApp Image 2025-07-06 at 4.10.25 PM_1751811384442.jpeg";
import pabloImage23 from "@assets/WhatsApp Image 2025-07-06 at 4.10.26 PM_1751811384442.jpeg";
import pabloImage24 from "@assets/WhatsApp Image 2025-07-06 at 4.10.28 PM_1751811384441.jpeg";
import pabloImage25 from "@assets/WhatsApp Image 2025-07-06 at 4.10.29 PM_1751811384440.jpeg";
import pabloImage26 from "@assets/WhatsApp Image 2025-07-06 at 4.10.29 PM (1)_1751811384440.jpeg";
import pabloImage27 from "@assets/WhatsApp Image 2025-07-06 at 4.10.30 PM_1751811384439.jpeg";
import pabloImage28 from "@assets/WhatsApp Image 2025-07-06 at 4.10.30 PM (1)_1751811384438.jpeg";
import pabloImage29 from "@assets/WhatsApp Image 2025-07-06 at 4.10.30 PM (2)_1751811384438.jpeg";
import pabloImage30 from "@assets/WhatsApp Image 2025-07-06 at 4.10.30 PM (3)_1751811384437.jpeg";

export default function PabloPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    {
      src: pabloImage,
      alt: "Pablo Mate - Profesor BJJ y Judo"
    },
    {
      src: pabloImage1,
      alt: "Pablo Mate entrenando BJJ"
    },
    {
      src: pabloImage2,
      alt: "Pablo Mate en competición"
    },
    {
      src: pabloImage3,
      alt: "Pablo Mate enseñando técnicas"
    },
    {
      src: pabloImage4,
      alt: "Pablo Mate en el tatami"
    },
    {
      src: pabloImage5,
      alt: "Pablo Mate practicando Judo"
    },
    {
      src: pabloImage6,
      alt: "Pablo Mate en sesión de entrenamiento"
    },
    {
      src: pabloImage7,
      alt: "Pablo Mate demostrando técnicas"
    },
    {
      src: pabloImage8,
      alt: "Pablo Mate en clase"
    },
    {
      src: pabloImage9,
      alt: "Pablo Mate entrenando alumnos"
    },
    {
      src: pabloImage10,
      alt: "Pablo Mate en competición BJJ"
    },
    {
      src: pabloImage11,
      alt: "Pablo Mate enseñando Judo"
    },
    {
      src: pabloImage12,
      alt: "Pablo Mate en el gimnasio"
    },
    {
      src: pabloImage13,
      alt: "Pablo Mate practicando técnicas"
    },
    {
      src: pabloImage14,
      alt: "Pablo Mate con sus alumnos"
    },
    {
      src: pabloImage15,
      alt: "Pablo Mate en entrenamiento"
    },
    {
      src: pabloImage16,
      alt: "Pablo Mate demostrando BJJ"
    },
    {
      src: pabloImage17,
      alt: "Pablo Mate en sesión práctica"
    },
    {
      src: pabloImage18,
      alt: "Pablo Mate enseñando artes marciales"
    },
    {
      src: pabloImage19,
      alt: "Pablo Mate en el tatami de Kaizen"
    },
    {
      src: pabloImage20,
      alt: "Pablo Mate - Instructor profesional"
    },
    {
      src: pabloImage21,
      alt: "Pablo Mate en sesión de entrenamiento"
    },
    {
      src: pabloImage22,
      alt: "Pablo Mate practicando técnicas avanzadas"
    },
    {
      src: pabloImage23,
      alt: "Pablo Mate en competición profesional"
    },
    {
      src: pabloImage24,
      alt: "Pablo Mate demostrando Judo"
    },
    {
      src: pabloImage25,
      alt: "Pablo Mate enseñando BJJ"
    },
    {
      src: pabloImage26,
      alt: "Pablo Mate en el tatami"
    },
    {
      src: pabloImage27,
      alt: "Pablo Mate con sus estudiantes"
    },
    {
      src: pabloImage28,
      alt: "Pablo Mate entrenando en Kaizen"
    },
    {
      src: pabloImage29,
      alt: "Pablo Mate en clase grupal"
    },
    {
      src: pabloImage30,
      alt: "Pablo Mate - Maestro de artes marciales"
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-kaizen-darker">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-kaizen-darker via-kaizen-dark to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Content */}
            <div className="order-2 lg:order-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                <span className="text-kaizen-gold">Pablo Mate</span>
                <br />
                <span className="text-lg sm:text-xl md:text-2xl">Profesor de BJJ y Judo</span>
              </h1>
              
              <div className="space-y-4 sm:space-y-6 text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                <p>
                  <strong className="text-kaizen-gold">Profesor Pablo Mate</strong> - Faixa Preta/Black Belt 1° Grado y Cinturón Negro de Judo 1° Dan, representa la dedicación y evolución constante en las artes marciales.
                </p>
                
                <p>
                  Hace 15 años empezó una de las clases de Alonso y se enamoró del jiu jitsu desde el primer día, quedándose a su lado hasta el día de hoy y pasando por todas las fases, estudiante, competidor participando en numerosos campeonatos con kimono y sin Kimono No Gi y hoy como profesor, siempre aportando al equipo y sus alumnos su gran experiencia de una forma seria y divertida al mismo tiempo.
                </p>
              </div>

              {/* Professional Credentials Section */}
              <div className="mt-6 sm:mt-8 p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-kaizen-darker/80 to-black/40 rounded-2xl border-2 border-kaizen-gold/30 shadow-2xl">
                <div className="flex items-center mb-4 sm:mb-6">
                  <div className="w-1 h-6 sm:h-8 bg-kaizen-gold mr-3 sm:mr-4"></div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-kaizen-gold">Graduaciones y Certificaciones Profesionales</h3>
                </div>
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-kaizen-dark/50 p-3 sm:p-4 rounded-lg border-l-4 border-kaizen-red">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-kaizen-red rounded-full mr-3"></div>
                      <span className="text-white font-semibold text-sm sm:text-base lg:text-lg">Faixa preta/black Belt 1°Grado</span>
                    </div>
                  </div>
                  <div className="bg-kaizen-dark/50 p-3 sm:p-4 rounded-lg border-l-4 border-kaizen-red">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-kaizen-red rounded-full mr-3"></div>
                      <span className="text-white font-semibold text-sm sm:text-base lg:text-lg">Cinto negro de judo 1° Dan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Slider */}
            <div className="order-1 lg:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-kaizen-red/20 to-kaizen-gold/20 rounded-2xl transform rotate-3"></div>
                
                {/* Main Image */}
                <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl shadow-2xl overflow-hidden">
                  <img
                    src={images[currentImageIndex].src}
                    alt={images[currentImageIndex].alt}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Navigation Arrows - only show if more than 1 image */}
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}
                  
                  {/* Image Indicators - only show if more than 1 image */}
                  {images.length > 1 && (
                    <div className="absolute bottom-3 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'bg-kaizen-gold' 
                              : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pablo Mate en Acción Gallery */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-kaizen-dark to-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
              <span className="text-kaizen-gold">Pablo Mate</span> en <span className="text-kaizen-red">Acción</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
              Descubre la pasión y técnica de Pablo en el tatami, enseñando y practicando las artes marciales
            </p>
          </div>

          {/* Action Photos Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {images.slice(1, 13).map((image, index) => (
              <div 
                key={index}
                className="relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={() => setCurrentImageIndex(index + 1)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-xs sm:text-sm font-medium truncate">
                      {image.alt}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View More Button */}
          <div className="text-center mt-8 sm:mt-12">
            <button 
              onClick={() => setCurrentImageIndex(0)}
              className="bg-kaizen-red hover:bg-red-700 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105"
            >
              Ver Galería Completa ({images.length} fotos)
            </button>
          </div>
        </div>
      </section>

      {/* Journey & Philosophy Section */}
      <section className="py-20 bg-kaizen-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Trayectoria y <span className="text-kaizen-red">Filosofía</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Student Phase */}
            <div className="bg-gradient-to-br from-kaizen-darker to-kaizen-dark p-8 rounded-xl border border-kaizen-gold/20 hover:border-kaizen-gold/40 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Target className="w-8 h-8 text-kaizen-gold mr-3" />
                <h3 className="text-2xl font-bold text-white">Estudiante</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Comenzó su camino hace 15 años bajo la tutela de Antonio Alonso, enamorándose del jiu jitsu desde el primer día y demostrando una dedicación excepcional al arte.
              </p>
            </div>

            {/* Competitor Phase */}
            <div className="bg-gradient-to-br from-kaizen-darker to-kaizen-dark p-8 rounded-xl border border-kaizen-red/20 hover:border-kaizen-red/40 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Medal className="w-8 h-8 text-kaizen-red mr-3" />
                <h3 className="text-2xl font-bold text-white">Competidor</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Participó activamente en numerosos campeonatos tanto en modalidad Gi como No-Gi, adquiriendo valiosa experiencia competitiva que hoy transmite a sus estudiantes.
              </p>
            </div>

            {/* Instructor Phase */}
            <div className="bg-gradient-to-br from-kaizen-darker to-kaizen-dark p-8 rounded-xl border border-kaizen-gold/20 hover:border-kaizen-gold/40 transition-all duration-300">
              <div className="flex items-center mb-6">
                <Trophy className="w-8 h-8 text-kaizen-gold mr-3" />
                <h3 className="text-2xl font-bold text-white">Profesor</h3>
              </div>
              <p className="text-gray-300 leading-relaxed">
                Hoy como profesor, aporta al equipo y sus alumnos su gran experiencia de una forma seria y divertida, manteniendo vivo el espíritu de mejora continua del Kaizen.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Philosophy */}
      <section className="py-20 bg-gradient-to-br from-kaizen-darker to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
            Filosofía de <span className="text-kaizen-gold">Enseñanza</span>
          </h2>
          
          <div className="bg-gradient-to-r from-kaizen-dark/50 to-kaizen-darker/50 p-8 rounded-2xl border border-kaizen-gold/20">
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              "La evolución constante y la pasión por el aprendizaje son los pilares de mi enseñanza. Desde estudiante hasta profesor, cada fase me ha enseñado que el jiu jitsu no es solo técnica, sino un camino de crecimiento personal."
            </p>
            <p className="text-lg text-kaizen-gold font-semibold">
              - Pablo Mate, Profesor BJJ & Judo
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-kaizen-red">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Entrena con Pablo Mate
          </h2>
          <p className="text-xl text-red-100 mb-8">
            Descubre el BJJ y Judo con un instructor que ha vivido todas las fases del arte marcial
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => document.querySelector("#contacto")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-kaizen-gold text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-600 transition-colors duration-300 flex items-center justify-center"
            >
              <Calendar className="mr-2" size={20} />
              Reserva tu Clase
            </button>
            <a 
              href="tel:662323282" 
              className="border-2 border-kaizen-gold text-kaizen-gold hover:bg-kaizen-gold hover:text-black px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center"
            >
              Llama Ahora
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}