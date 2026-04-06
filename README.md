# 🎬📚 El Rincón Monterizo

> Plataforma digital **on-demand** de contenido **educativo, cultural y audiovisual**, pensada para acercar conocimiento, identidad local y entretenimiento en un solo lugar.

![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19+-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4+-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-Code_Quality-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)

---

## ✨ Descripción

**El Rincón Monterizo** es una plataforma web orientada a la distribución de contenido **on-demand**, con foco en materiales de valor para la comunidad:

- 📖 libros digitales
- 🎓 cursos en video
- 🎥 contenido audiovisual
- 🏛️ recursos culturales y educativos
- 📢 espacios publicitarios para auspiciantes locales

La propuesta inicial del proyecto es ofrecer una experiencia **gratuita para el usuario final**, financiada mediante **publicidad digital local** integrada de forma limpia y no invasiva dentro de la plataforma.

---

## 🎯 Objetivo del proyecto

Construir una plataforma moderna, escalable y fácil de administrar que permita:

- publicar contenido educativo y cultural
- organizar materiales por categorías
- visualizar videos on-demand
- acceder a documentos digitales
- promocionar anunciantes locales
- sentar una base sólida para crecimiento futuro

---

## 🧠 Visión

La visión de **El Rincón Monterizo** es convertirse en un espacio digital de referencia para la comunidad, donde convivan:

- educación
- cultura
- identidad regional
- contenido audiovisual
- oportunidades de difusión para marcas y comercios locales

---

## 🚀 Estado actual del proyecto

Actualmente el proyecto ya superó la etapa inicial de setup y cuenta con una base funcional de frontend, backend y administración.

### ✅ Ya implementado

- inicialización del proyecto con Next.js
- configuración de TypeScript
- integración de Tailwind CSS
- configuración de ESLint
- integración de shadcn/ui
- layout base con header y footer
- navegación pública principal
- catálogo público de contenidos
- detalle dinámico de contenido por categoría
- integración con Supabase
- lectura real de contenidos desde base de datos
- lectura real de sponsors desde base de datos
- esquema SQL inicial del MVP documentado en `database/schema.sql`
- autenticación admin con Supabase Auth
- rutas protegidas para administración
- dashboard admin inicial
- listado admin de contenidos
- alta de contenidos desde panel admin con persistencia real en Supabase
- base preparada para gestión administrativa de sponsors
- soporte de reproducción según proveedor de video:
  - YouTube embebido
  - Mux preparado mediante `mux_playback_id`
  - enlaces externos mediante `contentUrl`
- menú hamburguesa responsive para mobile
- deploy inicial en Vercel operativo
- URL pública de prueba disponible

### 🌐 Deploy de prueba

El proyecto ya cuenta con un deploy funcional en Vercel para pruebas iniciales:

**URL pública:**  
`https://el-rincon-monterizo-7x5n.vercel.app/`

> Esta URL puede cambiar si más adelante se configura un dominio personalizado o se ajusta la estrategia de entornos.

### 🛠️ Próximamente

- edición de contenidos desde panel admin
- alta y edición completa de sponsors desde panel admin
- publicación / despublicación desde administración
- experiencia más rica de lectura para documentos
- mejora de reproducción audiovisual y media workflows
- endurecimiento para producción

---

## 🧱 Stack tecnológico

## Tecnologías base actualmente usadas

### ⚛️ Next.js
Framework principal para construir la aplicación web.

**¿Para qué se usa?**
- renderizado del frontend
- routing moderno con App Router
- estructura escalable para páginas y layouts
- server components y client components
- server actions
- optimización general del rendimiento

---

### ⚛️ React
Librería base sobre la que se apoya Next.js para construir interfaces.

**¿Para qué se usa?**
- creación de componentes reutilizables
- composición de la UI
- manejo declarativo de vistas
- formularios y estados del panel admin

---

### 🔷 TypeScript
Superset de JavaScript con tipado estático.

**¿Para qué se usa?**
- mejorar la mantenibilidad del código
- reducir errores
- definir contratos claros entre componentes, servicios y módulos
- escalar el proyecto con mayor seguridad

---

### 🎨 Tailwind CSS
Framework utility-first para estilos.

**¿Para qué se usa?**
- construir interfaces rápidas y modernas
- mantener consistencia visual
- evitar hojas CSS enormes
- acelerar el desarrollo del diseño responsive

---

### 🧩 shadcn/ui
Sistema de componentes reutilizables para React.

**¿Para qué se usa?**
- acelerar el desarrollo del frontend
- crear interfaces limpias y consistentes
- mejorar la experiencia visual del producto

---

### 🧹 ESLint
Herramienta de análisis estático de código.

**¿Para qué se usa?**
- detectar errores
- mantener buenas prácticas
- unificar criterios de calidad
- prevenir inconsistencias en el código

---

### 🗄️ Supabase
Backend as a Service basado en PostgreSQL.

**¿Para qué se usa hoy?**
- autenticación admin
- lectura pública de contenidos
- lectura pública de sponsors
- escritura administrativa de contenidos
- base de datos relacional del proyecto

---

### 🐘 PostgreSQL
Base de datos relacional robusta y escalable.

**¿Para qué se usa hoy?**
- gestión de contenidos
- sponsors
- publicación
- orden de visualización
- metadata de recursos
- soporte de reproducción por proveedor de video

---

### 🎬 Mux
Plataforma de video para contenido on-demand.

**Estado actual**
- ya contemplado en el modelo del proyecto
- soporte preparado mediante `mux_playback_id` para reproducción

**¿Para qué se usará?**
- reproducción optimizada
- entrega eficiente de contenido audiovisual
- futura gestión de video más profesional

---

### ▲ Vercel
Plataforma de despliegue recomendada para aplicaciones Next.js.

**Se planea usar para:**
- deploy del frontend
- previews automáticas
- integración fluida con el stack de Next.js

---

## 🏗️ Arquitectura base del proyecto

```bash
el-rincon-monterizo/
├── database/               # SQL y estructura inicial del modelo
│   └── schema.sql
├── docs/                   # Documentación interna del proyecto
│   ├── architecture.md
│   ├── coding-standards.md
│   ├── data-model.md
│   ├── product-rules.md
│   ├── roadmap.md
│   └── skills/
├── public/                 # Recursos públicos estáticos
├── src/
│   ├── app/                # Rutas, páginas, layouts (App Router)
│   ├── components/         # Componentes reutilizables
│   ├── constants/          # Constantes globales
│   ├── features/           # Módulos funcionales del negocio
│   ├── hooks/              # Hooks personalizados
│   ├── lib/                # Utilidades, auth, Supabase y helpers
│   ├── services/           # Servicios y lógica server-side
│   └── types/              # Tipos globales de TypeScript
├── AGENTS.md               # Reglas/contexto para agentes
├── CLAUDE.md               # Archivo de apoyo para desarrollo asistido
├── README.md
└── package.json