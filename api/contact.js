import { z } from 'zod';

// Contact form schema
const insertContactSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().optional().default(""),
  discipline: z.string().min(1, "Selecciona una disciplina"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres")
});

// Simple in-memory storage for demo (you'll need to connect to your database)
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
    
    // Validate the request body
    const contactData = insertContactSchema.parse(body);
    
    // Here you would normally save to your database
    // For now, we'll just log and return success
    console.log('Contact form submission:', contactData);
    
    // In production, you'd want to:
    // 1. Connect to your Neon database
    // 2. Insert the contact data
    // 3. Maybe send an email notification
    
    res.status(200).json({ 
      success: true, 
      message: "Mensaje enviado correctamente. Te contactaremos pronto." 
    });
  } catch (error) {
    console.error("Contact form error:", error);
    
    if (error.name === 'ZodError') {
      return res.status(400).json({ 
        success: false, 
        message: "Datos inválidos: " + error.errors.map(e => e.message).join(', ')
      });
    }
    
    res.status(400).json({ 
      success: false, 
      message: "Error al enviar el mensaje. Por favor, inténtalo de nuevo." 
    });
  }
}