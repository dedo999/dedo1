import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import { Link } from "wouter";

export default function MobileNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: "#inicio", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#instructores", label: "Instructores" },
    { href: "#horarios", label: "Horarios" },
    { href: "#precios", label: "Precios" },
    { href: "#testimonios", label: "Testimonios" },
    { href: "#contacto", label: "Contacto" },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent("¡Hola! Me interesa información sobre las clases de artes marciales en KaizenAcademy Burgos.");
    window.open(`https://wa.me/34662323282?text=${message}`, '_blank');
  };

  const callGym = () => {
    window.location.href = 'tel:+34662323282';
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-kaizen-darker/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/kaizen-logo-transparent.png" 
              alt="Kaizen Logo"
              className="h-10 w-auto"
              loading="eager"
            />
          </div>
          
          {/* Mobile quick actions */}
          <div className="flex items-center space-x-2 md:hidden">
            <button
              onClick={callGym}
              className="p-2 bg-kaizen-red hover:bg-red-700 text-white rounded-full transition-colors duration-200 touch-manipulation"
              aria-label="Llamar"
            >
              <Phone size={18} />
            </button>
            <button
              onClick={openWhatsApp}
              className="p-2 bg-green-600 hover:bg-green-700 text-white rounded-full transition-colors duration-200 touch-manipulation"
              aria-label="WhatsApp"
            >
              <MessageCircle size={18} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white hover:text-kaizen-red transition-colors duration-200 touch-manipulation"
              aria-label="Menú"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="text-gray-300 hover:text-kaizen-red transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
            <Link 
              href="/eventos"
              className="text-gray-300 hover:text-kaizen-red transition-colors duration-200 font-medium bg-gradient-to-r from-red-600/20 to-yellow-500/20 px-3 py-1 rounded-lg border border-red-500/30"
              data-testid="nav-link-eventos"
            >
              🥊 Eventos
            </Link>
            <button
              onClick={openWhatsApp}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 font-medium"
            >
              WhatsApp
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="bg-kaizen-darker/95 backdrop-blur-md border-t border-gray-700 py-4">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-3 text-gray-300 hover:text-kaizen-red hover:bg-kaizen-dark/50 transition-colors duration-200 font-medium touch-manipulation"
              >
                {item.label}
              </button>
            ))}
            <Link 
              href="/eventos"
              onClick={() => setIsOpen(false)}
              className="block w-full text-left px-4 py-3 text-gray-300 hover:text-kaizen-red hover:bg-kaizen-dark/50 transition-colors duration-200 font-medium touch-manipulation bg-gradient-to-r from-red-600/20 to-yellow-500/20 border-l-4 border-red-500"
              data-testid="mobile-nav-link-eventos"
            >
              🥊 Eventos MMA
            </Link>
            <div className="px-4 py-3 border-t border-gray-700 mt-2 flex space-x-4">
              <button
                onClick={openWhatsApp}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors duration-200 font-medium touch-manipulation"
              >
                WhatsApp
              </button>
              <button
                onClick={callGym}
                className="flex-1 bg-kaizen-red hover:bg-red-700 text-white py-2 rounded-lg transition-colors duration-200 font-medium touch-manipulation"
              >
                Llamar
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}