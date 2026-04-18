# Bible Companion

Landing page profesional para Bible Companion - una herramienta de estudio biblico con analisis exegetico basado en el metodo historico-gramatical.

## Stack Tecnologico

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS** + **shadcn/ui**
- **GSAP** para animaciones
- **Lucide React** para iconos

## Instalacion Local

```bash
# 1. Clonar el repositorio
git clone <repo-url>
cd bible-companion

# 2. Instalar dependencias
npm install

# 3. Copiar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales

# 4. Iniciar servidor de desarrollo
npm run dev
```

La app estara disponible en `http://localhost:3000`.

## Build para Produccion

```bash
npm run build
```

Los archivos estaticos se generan en la carpeta `dist/`.

## Deploy en Vercel

### Opcion 1: CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login y deploy
vercel login
vercel --prod
```

### Opcion 2: Git Integration

1. Sube el codigo a GitHub
2. Conecta tu repo en [vercel.com/new](https://vercel.com/new)
3. Selecciona el framework "Vite"
4. Setea las variables de entorno desde `.env.example`
5. Deploy automatico en cada push a `main`

## Deploy en Netlify

### Opcion 1: CLI

```bash
# Instalar Netlify CLI
npm i -g netlify-cli

# Login y deploy
netlify login
netlify deploy --prod --dir=dist
```

### Opcion 2: Git Integration

1. Sube el codigo a GitHub/GitLab/Bitbucket
2. Conecta tu repo en [app.netlify.com](https://app.netlify.com)
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Setea las variables de entorno en Site Settings > Environment Variables

### Opcion 3: Drag & Drop

1. Corre `npm run build`
2. Arrastra la carpeta `dist/` a [app.netlify.com/drop](https://app.netlify.com/drop)

## Estructura de Carpetas

```
src/
  components/      # Componentes reutilizables
    FloatingChat.tsx       # Chatbot flotante (Intercom-style)
    CalibrationModal.tsx   # Cuestionario de calibracion
    UpgradeModal.tsx       # Modal de upgrade a Premium
    StickyBanner.tsx       # Banner inferior de suscripcion
    EmailModal.tsx         # Modal de captura de email
    Navbar.tsx             # Barra de navegacion
    Preloader.tsx          # Pantalla de carga
    Toast.tsx              # Notificaciones toast
    BackToTop.tsx          # Boton volver arriba
    Logo.tsx               # SVG del logo
  sections/        # Secciones de la landing page
    Hero.tsx
    HowItWorks.tsx
    Features.tsx
    Audience.tsx
    Comparison.tsx
    Testimonials.tsx
    Pricing.tsx
    FAQ.tsx
    FinalCTA.tsx
    Footer.tsx
  pages/           # Paginas (rutas)
    NotFound.tsx   # Pagina 404
  hooks/           # Custom hooks
    useI18n.tsx           # Internacionalizacion EN/ES
    useTheme.tsx          # Dark/light mode
    useCalibration.ts     # Nivel de calibracion exegética
    useQuestionLimit.ts   # Limite de 5 preguntas/dia
    useScrollReveal.ts    # Animaciones al scroll
  i18n/            # Traducciones
    index.ts       # Objeto de traducciones EN/ES
    chatKnowledge.ts  # Base de datos exegetica + system prompt
```

## Integracion con Backend

El codigo contiene comentarios `/* BACKEND: ... */` indicando donde conectar:

### Firebase Auth
- **Archivo:** `src/App.tsx`
- **Accion:** Reemplazar el sistema de localStorage con Firebase Authentication
- **Provider:** Email/Password, Google Sign-In, Apple Sign-In

### Firestore
- **Archivo:** `src/hooks/useQuestionLimit.ts`
- **Coleccion:** `users/{uid}/usage`
- **Documento:** `{ questionsUsed: number, resetAt: timestamp, subscription: 'free'|'premium' }`

### Stripe Checkout
- **Archivo:** `src/components/UpgradeModal.tsx`, `src/sections/Pricing.tsx`
- **Accion:** Reemplazar `alert()` con redireccion a Stripe Checkout
- **Variable:** `VITE_STRIPE_PRICE_ID`

### OpenAI API
- **Archivo:** `src/components/FloatingChat.tsx`
- **Accion:** Reemplazar `generateResponse()` con llamada a tu backend
- **Endpoint:** `POST /api/chat`
- **System Prompt:** Incluido en los comentarios del componente

## Checklist de Funcionalidades

- [x] Chatbot flotante funcional (esquina inferior derecha)
- [x] Sistema de 11 pasos de exegesis (system prompt)
- [x] Calibracion exegética (Principiante/Intermedio/Avanzado)
- [x] Limite de 5 preguntas gratuitas por dia
- [x] Banner sticky de suscripcion
- [x] Modal de upgrade a Premium
- [x] Bilingue EN/ES con switch instantaneo
- [x] Dark/Light mode funcional
- [x] Animaciones GSAP en scroll
- [x] Preloader con animacion SVG
- [x] Navbar sticky con barra de progreso dorada
- [x] Menu mobile con hamburger
- [x] Pagina 404 funcional
- [x] Meta tags Open Graph
- [x] Back to Top button
- [x] Toast notifications
- [x] Email capture modal
- [x] Responsive (mobile-first)
- [x] .env.example con todas las variables
