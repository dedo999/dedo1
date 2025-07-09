import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      text: "Excelente gimnasio de artes marciales en Burgos. Instructores altamente cualificados y dedicados. Ambiente familiar y profesional.",
      author: "María González",
      timeAgo: "Hace 1 año"
    },
    {
      text: "Instalaciones excelentes con grandes medidas de higiene. Precios geniales. Aquí entrenan campeones del mundo.",
      author: "Carlos Ruiz",
      timeAgo: "Hace 8 meses"
    },
    {
      text: "Ambiente profesional apto tanto para principiantes como para profesionales. La atención personalizada es increíble.",
      author: "Ana Martín",
      timeAgo: "Hace 6 meses"
    },
    {
      text: "Perfect for families. My kids love the classes and the values they learn here. Highly recommended!",
      author: "David López",
      timeAgo: "Hace 4 meses"
    },
    {
      text: "Después de probar varios gimnasios, este es sin duda el mejor. Los instructores son top y el ambiente es único.",
      author: "Roberto Sánchez",
      timeAgo: "Hace 2 meses"
    },
    {
      text: "La filosofía Kaizen se nota en cada clase. Cada día mejoramos un poco más. Recomendado 100%.",
      author: "Laura Torres",
      timeAgo: "Hace 1 mes"
    }
  ];

  return (
    <section id="testimonios" className="py-20 bg-kaizen-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 px-2">
            Lo que Dicen Nuestros <span className="text-kaizen-red">Alumnos</span>
          </h2>
          <div className="flex flex-col sm:flex-row justify-center items-center mb-6 gap-2 sm:gap-0">
            <div className="flex text-kaizen-gold text-lg sm:text-xl md:text-2xl mr-0 sm:mr-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="fill-current" size={20} />
              ))}
            </div>
            <div className="flex items-center">
              <span className="text-2xl sm:text-3xl font-bold text-kaizen-gold">5.0</span>
              <span className="text-sm sm:text-base text-gray-300 ml-2">en Google (20+ reseñas)</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-kaizen-darker rounded-xl p-4 sm:p-6 lg:p-8 border border-gray-700 relative"
            >
              <div className="flex text-kaizen-gold text-base sm:text-lg mb-3 sm:mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="fill-current" size={14} />
                ))}
              </div>
              <p className="text-gray-300 mb-4 sm:mb-6 italic text-sm sm:text-base leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-700 rounded-full flex items-center justify-center mr-3 sm:mr-4">
                  <span className="text-kaizen-gold font-bold text-sm sm:text-base">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-bold text-white text-sm sm:text-base">{testimonial.author}</div>
                  <div className="text-xs sm:text-sm text-gray-400">{testimonial.timeAgo}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a 
            href="https://search.google.com/local/reviews?placeid=ChIJmYIkGwf9RQ0RptyA3F7u_fo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="border-2 border-kaizen-gold text-kaizen-gold hover:bg-kaizen-gold hover:text-black px-8 py-3 rounded-lg font-bold transition-all duration-300 transform hover:scale-105 inline-flex items-center"
          >
            <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Ver Todas las Reseñas
          </a>
        </div>
      </div>
    </section>
  );
}
