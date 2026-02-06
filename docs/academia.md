Academy Onboarding Flow (orden final)
1) Identity & Contact

File: IdentityStep.js (o fusionar con ContactStep si prefieres)

Identidad de la academia

Academy Name

Type: Text Input

Label: “Nombre de tu academia”

Contacto

Contact Name

Type: Text Input

Label: “Nombre y apellidos”

Email

Type: Email Input

Placeholder: “email@ejemplo.com
”

Phone

Type: Tel Input

Placeholder: “+34 600 000 000”

2) Location & Languages

File: LocationStep.js

Ubicación

Type: Google Places Autocomplete

Fields Captured: Country, State, City, Address

Idiomas de la academia (personal)

Type: Multi-select Chips

Question: “Idiomas de la academia”

Options: (desde LANGUAGES_LIST) Español, English, Português, Français, Italiano, Deutsch, etc.

Additional Input: “Otro idioma” (Text input)

3) Model (Tipo + Club principal)

File: ModelStep.js

Tipo de academia

Type: Single-select Chips

Label: “Tipo de Academia”

Options: Base · Alto Rendimiento · Mixta

Club principal

Works in Main Club?

Type: Toggle (Sí / No)

Question: “¿Trabajáis en un club principal?”

Conditional Fields (si Sí):

Club Name

Type: Text Input

Label: “Nombre del club”

4) Team

File: TeamStep.js

Equipo

Number of Coaches

Type: Dropdown

Label: “Número de Entrenadores”

Options: 1–2 · 3–5 · 6–10 · +10

Certification

Type: Single-select Chips

Label: “Certificación del Equipo”

Options: Todos certificados · Parcialmente certificados · No certificados

5) Services & Monetization

File: ServicesStep.js

Servicios ofrecidos

Services Offered

Type: Multi-select Chips

Label: “Servicios Ofrecidos”

Options: Clases Individuales · Clases Grupales · Packs Mensuales · Campus / Stages

Monetización

Precio Medio Mensual por Alumno

Type: Dropdown

Label: “Precio Medio Mensual por Alumno”

Options: < 50 € · 50–100 € · 100–200 € · 200–300 € · 300 € +

6) Operations

File: OperationsStep.js

Niveles que trabajáis

Levels

Type: Multi-select Chips

Label: “Niveles que trabaja la academia”

Options: Iniciación · Intermedio · Avanzado · Competición

Gestión y horarios

Booking Method

Type: Single-select Chips

Label: “Gestión de reservas”

Options: WhatsApp · Excel / Manual · App · Mixto

Time Slots

Type: Multi-select Chips

Label: “Horarios habituales”

Options: Mañanas · Mediodías · Tardes · Noches

7) Marketing, Visibility & Discovery

File: MarketingStep.js

Patrocinios

Sponsors

Type: Toggle (Sí / No)

Question: “¿Tenéis algún patrocinador?”

Conditional Fields (si Sí):

Brand Name

Type: Text Input

Label: “Nombres de los patrocinadores”

Presencia digital

Digital Presence

Type: Text Input

Label: “Presencia Digital”

Placeholder: “@tu_academia o web”

Cómo nos has conocido

Type: Single-select (Chips o Radio)

Question: “¿Cómo nos has conocido?”

Options: Instagram · TikTok · YouTube · Google / Búsqueda en internet · Recomendación · Club / Evento · Otro

8) Verification

File: VerificationStep.js

Verificación

Verification Request

Type: Toggle (Sí / No)

Question: “¿Quieres verificar tu academia?”

Conditional Fields (si Sí):

Documents

Type: File Upload

Label: “Documentos” (Licencia, Federación, CIF, etc.)

Formats: Images / PDF