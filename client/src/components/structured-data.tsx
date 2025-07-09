export default function StructuredData() {
  const gymSchema = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "@id": "https://kaizenburgos.com",
    "name": "KaizenAcademy改善Burgos",
    "alternateName": "Kaizen Burgos",
    "description": "Academia #1 de artes marciales en Burgos. Clases de MMA, jiu jitsu, kickboxing, boxeo y defensa personal. Instructores certificados, clases para niños y adultos.",
    "url": "https://kaizenburgos.com",
    "telephone": "+34662323282",
    "email": "info@kaizenburgos.com",
    "image": [
      "https://kaizenburgos.com/kaizen-logo-transparent.png",
      "https://kaizenburgos.com/mma-image.jpg",
      "https://kaizenburgos.com/bjj-image-new.webp",
      "https://kaizenburgos.com/kickboxing-image.webp",
      "https://kaizenburgos.com/boxeo-image.webp",
      "https://kaizenburgos.com/kids-martial-arts.jpg"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "C. Esteban Sáez Alvarado, N° 8",
      "addressLocality": "Burgos",
      "addressRegion": "Castilla y León",
      "postalCode": "09007",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.3601,
      "longitude": -3.7002
    },
    "openingHours": [
      "Mo 18:00-21:45",
      "Tu 09:00-11:00,19:00-21:30",
      "We 18:00-21:45",
      "Th 09:00-11:00,19:00-21:30",
      "Fr 19:00-20:30",
      "Sa 11:00-13:00"
    ],
    "priceRange": "€40-€80",
    "currenciesAccepted": "EUR",
    "paymentAccepted": "Cash, Bank Transfer, Bizum",
    "hasMap": "https://maps.google.com/?q=C.+Esteban+Sáez+Alvarado+8+Burgos",
    "sport": [
      "Mixed Martial Arts",
      "Brazilian Jiu-Jitsu",
      "Kickboxing",
      "Boxing",
      "Self Defense"
    ],
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Changing Rooms",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Professional Equipment",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Air Conditioning",
        "value": true
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Parking",
        "value": true
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "20",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "María González"
        },
        "reviewBody": "El mejor gimnasio de artes marciales de Burgos. Instructores altamente cualificados y dedicados. Ambiente familiar y profesional."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Carlos Ruiz"
        },
        "reviewBody": "Instalaciones excelentes con grandes medidas de higiene. Precios geniales. Aquí entrenan campeones del mundo."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Ana Martín"
        },
        "reviewBody": "Ambiente profesional apto tanto para principiantes como para profesionales. La atención personalizada es increíble."
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Clases de Artes Marciales",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Clases de MMA",
          "description": "Clases de artes marciales mixtas para principiantes y avanzados",
          "price": "40",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Clases de Jiu Jitsu",
          "description": "Brazilian Jiu-Jitsu gi y no-gi",
          "price": "50",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Clases de Kickboxing",
          "description": "Kickboxing para fitness y defensa personal",
          "price": "45",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Clases de Boxeo",
          "description": "Boxeo profesional y amateur",
          "price": "40",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        },
        {
          "@type": "Offer",
          "name": "Artes Marciales para Niños",
          "description": "Clases infantiles de jiu jitsu",
          "price": "35",
          "priceCurrency": "EUR",
          "availability": "https://schema.org/InStock"
        }
      ]
    },
    "employee": [
      {
        "@type": "Person",
        "name": "Antonio Alonso",
        "jobTitle": "Instructor Principal - Cinturón Negro BJJ",
        "description": "Profesor de Artes Marciales con más de 45 años de experiencia. Pionero del Jiu Jitsu Brasileño y MMA en Castilla y León.",
        "knowsAbout": ["Brazilian Jiu-Jitsu", "MMA", "Judo", "Grappling"]
      },
      {
        "@type": "Person",
        "name": "Pablo Mate",
        "jobTitle": "Instructor BJJ y Judo",
        "description": "Profesor especializado en Brazilian Jiu-Jitsu y Judo con amplia experiencia en enseñanza",
        "knowsAbout": ["Brazilian Jiu-Jitsu", "Judo", "Grappling"]
      },
      {
        "@type": "Person",
        "name": "Eduardo Cortés",
        "jobTitle": "Instructor de Kickboxing y Defensa Personal",
        "description": "Experto en Kickboxing, Striking y Defensa personal, con más de 20 años de experiencia",
        "knowsAbout": ["Kickboxing", "Boxing", "Self Defense", "Striking"]
      },
      {
        "@type": "Person",
        "name": "Rubén Sancho",
        "jobTitle": "Instructor BJJ - Cinturón Marrón",
        "description": "Estudiante, instructor y competidor de Jiu Jitsu Brasileño",
        "knowsAbout": ["Brazilian Jiu-Jitsu", "Grappling", "Competition"]
      }
    ],
    "sameAs": [
      "https://www.instagram.com/kaizen_burgos",
      "https://www.facebook.com/kaizen.burgos.academy",
      "https://www.tiktok.com/@kaizen_burgos",
      "https://www.youtube.com/@kaizenburgos"
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://kaizenburgos.com/#organization",
    "name": "KaizenAcademy改善Burgos",
    "alternateName": "Kaizen Burgos",
    "description": "Academia #1 de artes marciales en Burgos especializada en MMA, jiu jitsu, kickboxing, boxeo y defensa personal",
    "url": "https://kaizenburgos.com",
    "telephone": "+34662323282",
    "email": "info@kaizenburgos.com",
    "image": "https://kaizenburgos.com/kaizen-logo-transparent.png",
    "logo": "https://kaizenburgos.com/kaizen-logo-transparent.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "C. Esteban Sáez Alvarado, N° 8",
      "addressLocality": "Burgos",
      "addressRegion": "Castilla y León",
      "postalCode": "09007",
      "addressCountry": "ES"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 42.3601,
      "longitude": -3.7002
    },
    "openingHours": [
      "Mo 18:00-21:45",
      "Tu 09:00-11:00,19:00-21:30",
      "We 18:00-21:45",
      "Th 09:00-11:00,19:00-21:30",
      "Fr 19:00-20:30",
      "Sa 11:00-13:00"
    ],
    "priceRange": "€40-€80",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "20",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasMap": "https://maps.google.com/?q=C.+Esteban+Sáez+Alvarado+8+Burgos",
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 42.3601,
        "longitude": -3.7002
      },
      "geoRadius": "50000"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 42.3601,
        "longitude": -3.7002
      },
      "geoRadius": "50000"
    },
    "keywords": "MMA Burgos, jiu jitsu Burgos, kickboxing Burgos, boxeo Burgos, artes marciales Burgos, defensa personal Burgos, artes marciales para niños Burgos, gimnasio artes marciales Burgos, clases MMA, clases kickboxing, clases boxeo, Brazilian Jiu-Jitsu",
    "sameAs": [
      "https://www.instagram.com/kaizen_burgos",
      "https://www.facebook.com/kaizen.burgos.academy",
      "https://www.tiktok.com/@kaizen_burgos",
      "https://www.youtube.com/@kaizenburgos"
    ]
  };

  return (
    <>
      {/* Main Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gymSchema)
        }}
      />
      
      {/* Local Business Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema)
        }}
      />
    </>
  );
}