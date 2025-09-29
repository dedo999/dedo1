# 🚀 Cómo subir Kaizen Burgos a Vercel

## Pre-requisitos
1. Cuenta en [Vercel](https://vercel.com)
2. Tu código en GitHub, GitLab, o Bitbucket
3. Variables de entorno configuradas

## 📋 Pasos para el Deployment

### 1. Preparar el Repositorio
Asegúrate de que tu código esté en un repositorio Git:
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Conectar con Vercel
1. Ve a [vercel.com](https://vercel.com) e inicia sesión
2. Haz click en "New Project"
3. Importa tu repositorio de GitHub/GitLab/Bitbucket
4. Selecciona el repositorio "kaizen-burgos"

### 3. Configurar el Proyecto
En la configuración del proyecto en Vercel:

**Framework Preset:** Other
**Root Directory:** . (raíz del proyecto)
**Build Command:** Usar el que está en vercel.json (automático)
**Output Directory:** Usar el que está en vercel.json (automático)
**Install Command:** `npm install`

*Nota: La configuración se hace automáticamente con vercel.json*

### 4. Variables de Entorno
En el dashboard de Vercel, ve a Settings > Environment Variables y agrega:

```
DATABASE_URL=tu_url_de_neon_database
NODE_ENV=production
```

### 5. Deploy
1. Haz click en "Deploy"
2. Espera a que termine el build (puede tomar 2-3 minutos)
3. ¡Tu sitio estará disponible en una URL de Vercel!

## 🔧 Configurar Dominio Personalizado

### En Vercel:
1. Ve a Project Settings > Domains
2. Agrega tu dominio: `kaizenburgos.com`
3. Vercel te dará registros DNS para configurar

### En tu proveedor de dominio (GoDaddy):
1. Ve a DNS Management
2. Vercel te mostrará los registros exactos que necesitas agregar
3. Copia y pega exactamente los registros que aparezcan en tu dashboard de Vercel
   - Normalmente serán registros tipo A y CNAME
   - **IMPORTANTE:** Usa solo los registros que Vercel te proporcione, no valores genéricos

### Verificación:
- Puede tomar hasta 48 horas para que se propague
- Vercel verificará automáticamente el dominio
- Te llegará SSL gratis cuando esté listo

## 📁 Estructura de Archivos Creados

```
/
├── vercel.json          # Configuración de Vercel
├── api/                 # Funciones serverless
│   ├── contact.js       # API de contacto
│   └── chatbot/
│       └── booking.js   # API del chatbot
├── .env.example         # Variables de entorno ejemplo
└── client/package.json  # Config del frontend
```

## 🔄 Actualizaciones Futuras

Para actualizar tu sitio:
1. Haz cambios en tu código
2. Commit y push a tu repositorio
3. Vercel automáticamente re-deployará

```bash
git add .
git commit -m "Update website"
git push origin main
```

## ⚡ APIs Disponibles

Tus APIs estarán disponibles en:
- `https://tudominio.com/api/contact` - Formulario de contacto
- `https://tudominio.com/api/chatbot/booking` - Reservas del chatbot

**Importante:** Solo estas dos APIs han sido convertidas a serverless (contacto y reservas del chatbot). El resto de funcionalidades del backend original (autenticación, gestión de usuarios, etc.) NO están incluidas en esta configuración de Vercel. 

Si necesitas esas funcionalidades:
1. Crea funciones adicionales en `/api/` siguiendo el mismo patrón
2. O considera hostear el backend completo en un servicio como Render/Railway

## 🔍 Troubleshooting

**Problema:** Build falla
- **Solución:** Revisa los logs en Vercel Dashboard

**Problema:** APIs no funcionan
- **Solución:** Verifica las variables de entorno

**Problema:** Dominio no funciona
- **Solución:** Espera la propagación DNS (hasta 48h)

## 📞 Testing

Para probar que todo funciona:
1. Visita tu dominio
2. Llena el formulario de contacto
3. Prueba el chatbot
4. Verifica que recibas las notificaciones

¡Listo! Tu sitio de Kaizen Burgos estará funcionando en Vercel con tu dominio personalizado.