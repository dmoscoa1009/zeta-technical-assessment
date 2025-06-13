# 🛒 ARKI E-commerce Monorepo

Proyecto full-stack de e-commerce construido con **Next.js (App Router)**, **Express.js**, **Prisma**, y una UI moderna basada en **Shadcn UI** y **Zustand**. Incluye autenticación JWT, gestión de productos/categorías, subida de imágenes, carrito de compras, panel de administración y más.

---

## 🚀 Instalación y Primeros Pasos

### 1. Clona el repositorio

```bash
git clone https://github.com/dmoscoa1009/zeta-technical-assessment.git
cd zeta-technical-assessment
```

### 2. Instala las dependencias

Instala las dependencias en la raíz, el cliente y el servidor:

```bash
# Instala dependencias raíz (incluye Prisma)
npm install

# Instala dependencias del cliente
cd apps/client
npm install

# Instala dependencias del servidor
cd ../server
npm install

# Vuelve a la raíz para los siguientes pasos
cd ../../
```

### 3. Configura las variables de entorno

Crea un archivo `.env` en la raíz con al menos:

```
DATABASE_URL="file:./dev.db" (se utilizó PostgreSQL)
JWT_SECRET="pon-un-secreto-seguro-aqui"
```

Ajusta `DATABASE_URL` si usas otro motor de base de datos.

Ejemplo:

```
DATABASE_URL="postgresql://youruser:yourpassword@localhost:5432/yourdatabase?schema=public"
JWT_SECRET="JTI9s37qSQPumjed1dXagQcD3Rl4EaXx"
```

### 4. Genera y migra la base de datos con Prisma

```bash
# Genera el cliente de Prisma
npx prisma generate

# Ejecuta las migraciones para crear la base de datos
npx prisma migrate dev --name init
```

### 5. Siembra la base de datos con datos de ejemplo

```bash
npx prisma db seed
```

Esto creará un usuario admin (`admin@arki.tech` / `admin123`), categorías y productos de ejemplo.

---

## 🏁 Comandos para Desarrollo y Producción

### Desarrollo (ambos proyectos a la vez)

```bash
npm run dev
```

Esto levanta el servidor Express y el cliente Next.js en modo desarrollo.

### Solo cliente (Next.js)

```bash
npm run client:dev
```

### Solo servidor (Express.js)

```bash
npm run server:dev
```

### Build de producción

```bash
npm run build
```

### Iniciar en producción

```bash
npm run start
```

---

## 🗂️ Estructura del Proyecto

```
zeta-technical-assessment/
│
├── apps/
│   ├── client/      # Next.js (frontend)
│   └── server/      # Express.js (backend)
│
├── prisma/          # Esquema, migraciones y seed de Prisma
│
├── package.json     # Scripts monorepo
└── .env             # Variables de entorno (raíz)
```

---

## 🛠️ Tecnologías y Librerías Principales

### **Frontend (apps/client)**

- **Next.js 15 (App Router)**
- **React 19**
- **Shadcn UI** (Radix UI, Tailwind CSS)
- **Zustand** (estado global y persistencia)
- **Axios** (peticiones HTTP)
- **Lucide React** (iconos)
- **jose** (middleware JWT en Edge)
- **Sonner** (notificaciones)
- **Tailwind CSS** (estilos)
- **TypeScript**

### **Backend (apps/server)**

- **Express.js**
- **Prisma ORM**
- **JWT (jsonwebtoken)**
- **Multer** (subida de imágenes)
- **Helmet** (seguridad)
- **CORS**
- **bcryptjs** (hash de contraseñas)
- **dotenv** (variables de entorno)
- **TypeScript**

### **Base de datos**

- **PostgreSQL** (por defecto, configurable vía `DATABASE_URL`)

---

## 📝 Funcionalidades Destacadas

- **Autenticación JWT** (registro, login, roles)
- **Panel de administración** (CRUD de productos y categorías, solo admin)
- **Subida de imágenes** para productos (con Multer)
- **Carrito de compras** (Zustand, persistente)
- **Filtrado y búsqueda** de productos por nombre y categoría
- **UI moderna y responsiva** (Shadcn, Tailwind, dark mode)
- **Protección de rutas** (middleware Next.js + validación en backend)
- **Seed de base de datos** con usuario admin y datos de ejemplo
- **Despliegue sencillo** (monorepo, scripts unificados)

---

## 👤 Acceso Admin de Ejemplo

- **Email:** `admin@arki.tech`
- **Contraseña:** `admin123`

---

## 📦 Scripts Útiles

- `npm run dev` — Levanta cliente y servidor en desarrollo
- `npm run build` — Compila ambos proyectos
- `npm run start` — Inicia ambos en producción
- `npx prisma migrate dev` — Aplica migraciones
- `npx prisma db seed` — Siembra la base de datos

---

## 📚 Notas

- Puede cambiar la base de datos a PostgreSQL, MySQL, etc. modificando `DATABASE_URL` y el esquema de Prisma.
- El middleware de Next.js solo verifica la presencia del token para UX; la seguridad real se valida en el backend.
- Las imágenes de productos se guardan en `apps/client/public/images/products`.
