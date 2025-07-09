import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  keywords: string[];
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData: FAQItem[] = [
    {
      question: "¿Dónde puedo practicar MMA en Burgos?",
      answer: "En KaizenAcademy改善Burgos ofrecemos clases de MMA (Artes Marciales Mixtas) en el centro de Burgos. Estamos ubicados en C. Esteban Sáez Alvarado, N° 8, cerca de la Plaza Mayor y la Catedral. Nuestras clases de MMA combinan striking, grappling y lucha en el suelo, perfectas para principiantes y avanzados.",
      keywords: ["MMA Burgos", "artes marciales mixtas", "dónde practicar MMA"]
    },
    {
      question: "¿Hay clases de kickboxing para mujeres en Burgos?",
      answer: "Sí, nuestras clases de kickboxing en Burgos están abiertas tanto para hombres como mujeres. El kickboxing es excelente para fitness, defensa personal y técnica de striking. Tenemos horarios flexibles martes y jueves de 20:00-21:30. Primera clase gratis para nuevas alumnas.",
      keywords: ["kickboxing Burgos", "clases de kickboxing", "kickboxing mujeres"]
    },
    {
      question: "¿Dónde aprender boxeo profesional en Burgos?",
      answer: "KaizenAcademy改善Burgos ofrece clases de boxeo profesional con instructores certificados. Nuestro programa incluye técnica, sparring y fitness. Horarios: martes 19:00-20:00, miércoles 20:30-21:45 y jueves 19:00-20:00. Eduardo Cortés, con +20 años de experiencia, es nuestro instructor especializado.",
      keywords: ["boxeo Burgos", "clases de boxeo", "boxeo profesional"]
    },
    {
      question: "¿Hay clases de jiu jitsu brasileño en Burgos?",
      answer: "Sí, somos la academia #1 de Brazilian Jiu-Jitsu en Burgos. Ofrecemos clases gi y no-gi con instructores cinturón negro certificados. Horarios: lunes 19:00-20:30, miércoles 19:00-20:30 y sábados 11:00-13:00 (Open Mat). Antonio Alonso y Pablo Mate son nuestros instructores principales.",
      keywords: ["jiu jitsu Burgos", "BJJ Burgos", "Brazilian Jiu-Jitsu"]
    },
    {
      question: "¿Tienen clases de defensa personal en Burgos?",
      answer: "Sí, ofrecemos clases de defensa personal integradas en nuestros programas de jiu jitsu y kickboxing. Eduardo Cortés, experto en defensa personal con +20 años de experiencia, enseña técnicas prácticas y efectivas. Ideal para mujeres y hombres de todas las edades.",
      keywords: ["defensa personal Burgos", "autodefensa", "defensa personal mujeres"]
    },
    {
      question: "¿Hay artes marciales para niños en Burgos?",
      answer: "Sí, tenemos programas especiales de artes marciales para niños de 6-12 años. Nuestras clases infantiles de jiu jitsu desarrollan disciplina, respeto y confianza. Horarios: lunes 18:00-19:00. Los niños aprenden valores tradicionales mientras se divierten y hacen ejercicio.",
      keywords: ["artes marciales para niños Burgos", "clases infantiles", "jiu jitsu niños"]
    },
    {
      question: "¿Cuál es el mejor gimnasio de artes marciales en Burgos?",
      answer: "KaizenAcademy改善Burgos es considerada la academia #1 de artes marciales en Burgos. Ofrecemos MMA, jiu jitsu, kickboxing, boxeo y defensa personal. Con instructores certificados, instalaciones modernas en el centro de Burgos y +20 años de experiencia. 5.0⭐ en Google Reviews.",
      keywords: ["gimnasio artes marciales Burgos", "academia artes marciales", "mejor gimnasio"]
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-kaizen-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
            Preguntas Frecuentes - <span className="text-kaizen-red">Artes Marciales Burgos</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            Respuestas a las preguntas más comunes sobre nuestras clases de MMA, jiu jitsu, kickboxing y boxeo en Burgos
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-kaizen-darker rounded-lg border border-gray-700 overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="text-kaizen-red flex-shrink-0" size={20} />
                ) : (
                  <ChevronDown className="text-kaizen-gold flex-shrink-0" size={20} />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {faq.keywords.map((keyword, keyIndex) => (
                      <span
                        key={keyIndex}
                        className="px-3 py-1 bg-kaizen-red/20 text-kaizen-gold text-sm rounded-full"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-400 mb-4">
            ¿Tienes más preguntas sobre nuestras clases de artes marciales en Burgos?
          </p>
          <a
            href="tel:662323282"
            className="inline-flex items-center px-6 py-3 bg-kaizen-red hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200"
          >
            Llamar Ahora: 662 323 282
          </a>
        </div>
      </div>

      {/* Structured Data for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqData.map(faq => ({
              "@type": "Question",
              "name": faq.question,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
              }
            }))
          })
        }}
      />
    </section>
  );
}