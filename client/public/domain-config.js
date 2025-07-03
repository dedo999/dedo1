// Domain Configuration for Kaizen Burgos
// This file helps with domain transition and SEO

const DOMAIN_CONFIG = {
  // Domain purchased and configured
  PRODUCTION_DOMAIN: 'kaizenburgos.com', // ✅ ACTIVE DOMAIN
  CURRENT_DOMAIN: window.location.hostname,
  
  // Business Information
  BUSINESS: {
    name: 'Kaizen Burgos',
    phone: '+34 666 777 888',
    email: 'info@kaizenburgos.com', // Update when domain is active
    address: 'Calle Ejemplo 123, 09001 Burgos, España',
    socialMedia: {
      instagram: '@kaizen_burgos',
      whatsapp: '+34666777888'
    }
  },
  
  // SEO Configuration
  SEO: {
    title: 'Kaizen Burgos - Gimnasio Artes Marciales | MMA, BJJ, Boxeo',
    description: 'Gimnasio de artes marciales en Burgos. Clases de MMA, Brazilian Jiu-Jitsu, Boxeo, Kickboxing. Entrenadores profesionales, horarios flexibles.',
    keywords: 'gimnasio burgos, artes marciales burgos, mma burgos, jiu jitsu burgos, boxeo burgos, kickboxing burgos, kaizen',
    ogImage: '/assets/kaizen-logo.png'
  }
};

// Utility functions for domain management
window.KAIZEN_CONFIG = DOMAIN_CONFIG;

// Auto-redirect function (uncomment when ready to redirect from Replit to custom domain)
/*
if (DOMAIN_CONFIG.CURRENT_DOMAIN.includes('replit.app') && 
    window.location.hostname !== DOMAIN_CONFIG.PRODUCTION_DOMAIN) {
  console.log('Production domain available, consider redirecting users');
}
*/