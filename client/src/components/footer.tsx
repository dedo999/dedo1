import { MapPin, Phone, Clock } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { href: "#inicio", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#instructores", label: "Instructores" },
    { href: "#horarios", label: "Horarios" },
    { href: "#testimonios", label: "Testimonios" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-kaizen-darker border-t border-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src="/kaizen_logo_new.png" 
                alt="KaizenAcademy改善Burgos Logo"
                className="h-14 w-auto"
              />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Gimnasio de artes marciales en Burgos especializado en MMA, kickboxing, Brazilian Jiu-Jitsu y boxeo. Filosofía de mejora continua.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.instagram.com/kaizen_burgos?igsh=YW9qcnNtN3ZkdWJw" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-kaizen-gold hover:text-yellow-400 transition-colors group"
                title="Síguenos en Instagram"
              >
                <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/share/1HnDKPr65E/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-kaizen-gold hover:text-yellow-400 transition-colors group"
                title="Síguenos en Facebook"
              >
                <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.tiktok.com/@kaizen_burgos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-kaizen-gold hover:text-yellow-400 transition-colors group"
                title="Síguenos en TikTok"
              >
                <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.293-1.982-1.293-3.338h-2.966v13.346c0 1.779-1.443 3.223-3.223 3.223s-3.223-1.443-3.223-3.223c0-1.779 1.443-3.223 3.223-3.223.335 0 .659.051.966.146v-3.013C11.09 8.275 11.021 8.27 10.946 8.27c-3.398 0-6.158 2.76-6.158 6.158s2.76 6.158 6.158 6.158 6.158-2.76 6.158-6.158V9.094c1.078.651 2.326 1.032 3.678 1.032v-2.966c-1.143 0-2.174-.425-2.958-1.126v.528z"/>
                </svg>
              </a>
              <a 
                href="https://www.youtube.com/@kaizenburgos" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-kaizen-gold hover:text-yellow-400 transition-colors group"
                title="Nuestros vídeos en YouTube"
              >
                <svg className="w-8 h-8 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-gray-300">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="hover:text-kaizen-red transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-4">Contacto</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start">
                <MapPin className="text-kaizen-red mr-2 mt-1 flex-shrink-0" size={16} />
                <div>
                  C. Esteban Sáez Alvarado, N° 8<br />
                  09007 Burgos, España
                </div>
              </li>
              <li className="flex items-center">
                <Phone className="text-kaizen-red mr-2 flex-shrink-0" size={16} />
                <a href="tel:662323282" className="hover:text-kaizen-gold transition-colors">
                  662 323 282
                </a>
              </li>
              <li className="flex items-start">
                <Clock className="text-kaizen-red mr-2 mt-1 flex-shrink-0" size={16} />
                <div>
                  Lun-Jue: 18:00-22:30<br />
                  Vie: 18:30-22:30<br />
                  Sáb: 10:00-13:00
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 KaizenAcademy改善Burgos. Todos los derechos reservados.
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Mejora continua • Excelencia en artes marciales • #KaizenBurgos
          </p>
        </div>
      </div>
    </footer>
  );
}
