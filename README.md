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

Actualmente el proyecto se encuentra en su **fase inicial de setup y arquitectura base**, con una primera estructura creada sobre Next.js.

### ✅ Ya implementado
- inicialización del proyecto con Next.js
- configuración de TypeScript
- integración de Tailwind CSS
- configuración de ESLint
- estructura base de carpetas
- archivos de documentación inicial del proyecto

### 🛠️ Próximamente
- integración de UI components
- conexión con base de datos
- módulo de contenidos
- módulo de publicidad local
- panel administrativo
- reproductor de videos on-demand
- biblioteca digital

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
- optimización general del rendimiento

---

### ⚛️ React
Librería base sobre la que se apoya Next.js para construir interfaces.

**¿Para qué se usa?**
- creación de componentes reutilizables
- composición de la UI
- manejo declarativo de vistas

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

### 🧹 ESLint
Herramienta de análisis estático de código.

**¿Para qué se usa?**
- detectar errores
- mantener buenas prácticas
- unificar criterios de calidad
- prevenir inconsistencias en el código

---

## 🧩 Tecnologías planificadas para el proyecto

> Estas tecnologías forman parte de la arquitectura prevista del producto, aunque algunas todavía no están integradas en esta etapa inicial.

### 🗄️ Supabase
Backend as a Service basado en PostgreSQL.

**Se planea usar para:**
- autenticación
- base de datos relacional
- almacenamiento de archivos
- políticas de acceso
- backend rápido para MVP

---

### 🐘 PostgreSQL
Base de datos relacional robusta y escalable.

**Se planea usar para:**
- gestión de contenidos
- usuarios
- anuncios
- categorías
- métricas
- relaciones entre módulos

---

### 🎬 Mux
Plataforma de video para contenido on-demand.

**Se planea usar para:**
- subida y procesamiento de videos
- reproducción optimizada
- entrega eficiente de contenido audiovisual
- evitar construir una infraestructura de video compleja desde cero

---

### 🧩 shadcn/ui
Sistema de componentes reutilizables para React.

**Se planea usar para:**
- acelerar el desarrollo del frontend
- crear interfaces limpias y consistentes
- mejorar la experiencia visual del producto

---

### ▲ Vercel
Plataforma de despliegue recomendada para aplicaciones Next.js.

**Se planea usar para:**
- deploy del frontend
- previews automáticas
- integración fluida con el stack de Next.js

---

## 🏗️ Arquitectura inicial del proyecto

```bash
el-rincon-monterizo/
├── docs/                   # Documentación interna del proyecto
│   ├── architecture.md
│   ├── coding-standards.md
│   ├── product-rules.md
│   └── roadmap.md
├── public/                 # Recursos públicos estáticos
├── src/
│   ├── app/                # Rutas, páginas, layouts (App Router)
│   ├── components/         # Componentes reutilizables
│   ├── constants/          # Constantes globales
│   ├── features/           # Módulos funcionales del negocio
│   ├── hooks/              # Hooks personalizados
│   ├── lib/                # Utilidades y helpers
│   ├── services/           # Servicios y lógica de acceso externo
│   └── types/              # Tipos globales de TypeScript
├── AGENTS.md               # Reglas/contexto para agentes
├── CLAUDE.md               # Archivo de apoyo para desarrollo asistido
├── README.md
└── package.json
```
---

### 🔄 Estado actual del desarrollo

Actualmente el proyecto ya cuenta con:

- estructura base en Next.js App Router
- UI inicial responsive con Tailwind CSS y shadcn/ui
- layout principal con header y footer
- catálogo público de contenidos
- detalle dinámico de contenido por categoría
- integración con Supabase
- lectura real de contenidos desde base de datos
- lectura real de sponsors desde base de datos
- esquema SQL inicial del MVP documentado en `database/schema.sql`

El proyecto continúa avanzando hacia:
- gestión administrativa de contenidos
- gestión de sponsors
- reproducción real de video
- experiencia de lectura/documentos
- endurecimiento para producción