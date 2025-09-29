// Helper function to parse request body
async function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(error);
      }
    });
  });
}

export default async function handler(req, res) {
  // Set CORS headers for same-origin requests
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Parse request body
    const body = await parseBody(req);
    
    const { customerName, customerEmail, customerPhone, discipline, preferredTime, message } = body;
    
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