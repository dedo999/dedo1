export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { customerName, customerEmail, customerPhone, discipline, preferredTime, message } = req.body;
    
    // Validate required fields
    if (!customerName || !customerEmail || !discipline) {
      return res.status(400).json({ 
        success: false, 
        message: "Faltan datos requeridos" 
      });
    }
    
    // Create booking contact entry
    const bookingData = {
      name: customerName,
      email: customerEmail,
      phone: customerPhone || '',
      discipline: discipline,
      message: `RESERVA VIA CHATBOT - Horario preferido: ${preferredTime}\nMensaje: ${message || 'Sin mensaje adicional'}`
    };
    
    // Here you would save to database
    console.log('Chatbot booking request:', bookingData);
    
    res.status(201).json({ 
      success: true,
      message: "Solicitud de reserva recibida. Te contactaremos pronto para confirmar.",
      booking: bookingData
    });
  } catch (error) {
    console.error("Chatbot booking error:", error);
    res.status(400).json({ 
      success: false, 
      message: "Error al procesar la solicitud de reserva" 
    });
  }
}