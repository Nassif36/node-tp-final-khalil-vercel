# Proyecto Final - API REST con Express y Firestore

API REST completa desarrollada con Node.js, Express y Firestore. Incluye autenticación JWT, CRUD de productos y protección de rutas.

## Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Uso de la API](#uso-de-la-api)
- [Ejemplos](#ejemplos)
- [Autenticación](#autenticación)

---

## Requisitos

- Node.js v18+ 
- npm o yarn
- Cuenta de Firebase con Firestore habilitado
- Credenciales de Firebase (API Key, Auth Domain, Project ID, etc.)

---

## Instalación

### 1. Clonar o descargar el proyecto

```bash
cd proyecto-final-khalil
```

### 2. Instalar dependencias

```bash
npm install
```

---

## Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Puerto del servidor
PORT=3000

# CORS: orígenes permitidos (separados por coma)
CORS_ORIGINS=http://localhost:3000,http://localhost:5173

# Firebase Configuration
FIREBASE_API_KEY=your_api_key_here
FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_STORAGE_BUCKET=your_project.appspot.com
FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
FIREBASE_APP_ID=your_app_id

# JWT Secret (usa una clave segura en producción)
JWT_SECRET=tu_clave_super_secreta_aqui
```

### Obtener tus credenciales de Firebase

1. Accede a [Firebase Console](https://console.firebase.google.com/)
2. Selecciona tu proyecto
3. Ve a **Project Settings** (rueda de engranaje) → **General**
4. Desplázate hasta **Your apps** → selecciona tu app web
5. Copia el objeto `firebaseConfig` y extrae los valores necesarios

---

## Estructura del Proyecto

```
proyecto-final-khalil/
├── src/
│   ├── controllers/       # Lógica de manejo de peticiones
│   │   ├── product.controllers.js
│   │   └── auth.controllers.js
│   ├── services/          # Lógica de negocio
│   │   └── product.services.js
│   ├── models/            # Acceso a datos (Firestore)
│   │   ├── product.models.js
│   │   └── firebase.js
│   ├── routes/            # Definición de rutas
│   │   ├── product.routes.js
│   │   └── auth.routes.js
│   ├── middleware/        # Middleware (autenticación, logging, etc.)
│   │   └── authentication.js
│   └── data/              # Configuración e inicialización
│       ├── data.js        # Inicialización de Firebase
│       └── token.js       # Helpers JWT
├── index.js               # Punto de entrada del servidor
├── package.json
├── .env                   # Variables de entorno (NO subir a Git)
├── .gitignore
└── readme.MD              # Este archivo
```

---

## Uso de la API

El servidor se ejecuta en `http://localhost:3000` por defecto.

### Iniciar el servidor

```bash
npm start
```

Verás en consola:
```
Servidor Express corriendo en http://localhost:3000
Mounted /api/auth routes
Mounted /api/products routes (con autenticación)
```

El servidor está listo para recibir peticiones.

---

## Autenticación

Las rutas de **productos** requieren un token JWT válido.

**Credenciales de prueba:**
- **Email:** `test@gmail.com`
- **Password:** `123456`

El servidor devuelve un token Bearer válido por 2 horas.

---

## Ejemplos con Postman

### 1. Login y obtener token

**En Postman:**
- **Método:** `POST`
- **URL:** `http://localhost:3000/api/auth/login`
- **Headers:** 
  - `Content-Type: application/json`
- **Body (raw JSON):**
```json
{
  "email": "test@gmail.com",
  "password": "123456"
}
```

**Respuesta exitosa (200):**
```json
{
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

⚠️ **Guarda este token** para usarlo en las próximas peticiones a productos.

---

### 2. Obtener todos los productos

**En Postman:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/products`
- **Headers:**
  - `Authorization: Bearer YOUR_TOKEN_HERE`

**Respuesta (200):**
```json
[
  {
    "id": "1",
    "title": "Camiseta T-Rex",
    "price": 300,
    "category": "remeras"
  },
  {
    "id": "2",
    "title": "Gorra Node",
    "price": 250,
    "category": "accesorios"
  }
]
```

---

### 3. Obtener un producto por ID

**En Postman:**
- **Método:** `GET`
- **URL:** `http://localhost:3000/api/products/1`
- **Headers:**
  - `Authorization: Bearer YOUR_TOKEN_HERE`

**Respuesta (200):**
```json
{
  "id": "1",
  "title": "Camiseta T-Rex",
  "price": 300,
  "category": "remeras"
}
```

**Si el producto no existe (404):**
```json
{
  "message": "Producto no encontrado"
}
```

---

### 4. Crear un nuevo producto

**En Postman:**
- **Método:** `POST`
- **URL:** `http://localhost:3000/api/products/create`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_TOKEN_HERE`
- **Body (raw JSON):**
```json
{
  "title": "Remera JavaScript",
  "price": 350,
  "category": "remeras"
}
```

**Respuesta (201 Created):**
```json
{
  "id": "1701100923456",
  "title": "Remera JavaScript",
  "price": 350,
  "category": "remeras"
}
```

---

### 5. Actualizar un producto

**En Postman:**
- **Método:** `PUT`
- **URL:** `http://localhost:3000/api/products/1`
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_TOKEN_HERE`
- **Body (raw JSON):**
```json
{
  "price": 400,
  "category": "remeras-premium"
}
```

**Respuesta (200):**
```json
{
  "id": "1",
  "title": "Camiseta T-Rex",
  "price": 400,
  "category": "remeras-premium"
}
```

---

### 6. Eliminar un producto

**En Postman:**
- **Método:** `DELETE`
- **URL:** `http://localhost:3000/api/products/1`
- **Headers:**
  - `Authorization: Bearer YOUR_TOKEN_HERE`

**Respuesta (200):**
```json
{
  "message": "Producto eliminado"
}
```

**Si el producto no existe (404):**
```json
{
  "message": "Producto no encontrado"
}
```

---

## Códigos de Estado HTTP

| Código | Significado |
|--------|-------------|
| 200    | OK - Petición exitosa |
| 201    | Created - Recurso creado exitosamente |
| 400    | Bad Request - Datos inválidos |
| 401    | Unauthorized - Token faltante o inválido |
| 403    | Forbidden - Token expirado o sin permisos |
| 404    | Not Found - Recurso no encontrado |
| 500    | Internal Server Error - Error del servidor |

---

## Troubleshooting

### Error: "Token requerido"

- Asegúrate de incluir el header `Authorization: Bearer <token>` en tus peticiones
- Verifica que el token esté correctamente formateado en Postman

### Error: "Token inválido"

- El token puede estar corrupto o malformado
- Intenta obtener un nuevo token con el endpoint de login

### Error: "Token expirado"

- Los tokens son válidos por 2 horas
- Obtén un nuevo token haciendo login nuevamente

### Error: "CORS policy: Origin not allowed"

- Actualiza la variable `CORS_ORIGINS` en `.env` para incluir el origen de tu aplicación frontend

### Error de conexión a Firestore

- Verifica que las credenciales de Firebase en `.env` sean correctas
- Confirma que tu proyecto de Firebase tiene Firestore habilitado
- Revisa que la colección se llama `"productos"` en Firestore

---

## Notas de Seguridad

⚠️ **IMPORTANTE para Producción:**

1. **NUNCA subas el archivo `.env`** con credenciales reales. Usa un `.gitignore` que lo excluya.
2. **Reemplaza `JWT_SECRET`** por una clave fuerte y aleatoria (mínimo 32 caracteres).
3. **Configura reglas de seguridad** en Firestore para controlar acceso a datos.
4. **Usa HTTPS** en producción.
5. **Valida y sanitiza** todas las entradas del usuario.
6. **Implementa rate limiting** para evitar abuso de la API.
7. **No compartas tokens** públicamente.

---

## Licencia

ISC

---

## Autor

Khalil

---

## Soporte

Para reportar bugs o sugerir mejoras, abre un issue en el repositorio.
