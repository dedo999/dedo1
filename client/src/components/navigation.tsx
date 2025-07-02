import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "#inicio", label: "Inicio" },
    { href: "#servicios", label: "Servicios" },
    { href: "#instructores", label: "Instructores" },
    { href: "#horarios", label: "Horarios" },
    { href: "#precios", label: "Precios" },
    { href: "#testimonios", label: "Testimonios" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 w-full bg-kaizen-darker/95 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img 
              src="/kaizen-logo.jpg" 
              alt="Kaizen Burgos Logo"
              className="h-10 w-auto mr-3 rounded"
            />
            <div>
              <div className="text-xl font-bold text-kaizen-red">KAIZEN</div>
              <div className="text-xs font-medium text-kaizen-gold">BURGOS</div>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="text-gray-300 hover:text-kaizen-red transition-colors duration-200 font-medium"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("#contacto")}
                className="bg-kaizen-red hover:bg-red-700 px-6 py-2 rounded-lg font-semibold text-white transition-all duration-200 transform hover:scale-105"
              >
                Contactar
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-kaizen-dark border-t border-gray-800">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="block w-full text-left px-3 py-2 text-gray-300 hover:text-kaizen-red font-medium"
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => scrollToSection("#contacto")}
                className="block w-full text-left px-3 py-2 bg-kaizen-red hover:bg-red-700 text-white font-semibold rounded-lg mt-2"
              >
                Contactar
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
