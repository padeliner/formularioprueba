Club Onboarding Flow (orden final)
1) Identity & Contact

File: IdentityStep.js (o fusionarlo aquí con ContactStep si prefieres)

Identidad del club

Club Name

Type: Text Input

Label: “Nombre de tu club”

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

Si quieres mantener archivos separados: deja “Nombre de tu club” en IdentityStep.js y el bloque de Contacto en ContactStep.js, pero el orden sería igual (uno detrás del otro).

2) Location & Languages

File: LocationStep.js

Ubicación

Type: Google Places Autocomplete

Fields Captured: Country, State, City

Idiomas del club (personal)

Type: Multi-select Chips

Question: “Idiomas del club”

Options: (desde LANGUAGES_LIST) Español, English, Português, Français, Italiano, Deutsch, etc.

Additional Input: “Otro idioma” (Text input)

3) Facilities

File: FacilitiesStep.js

Información de pistas

Number of Courts

Type: Dropdown

Label: “Número de pistas”

Options: 1–2 · 3–5 · 6–10 · +10

Installation Type

Type: Multi-select Chips

Label: “Tipo de instalación”

Options: Indoor · Outdoor

Surface Type

Type: Multi-select Chips

Label: “Superficie de pistas”

Options: Césped artificial · Hormigón · Resina · Moqueta · Otro

Lighting

Type: Toggle (Sí / No)

Label: “Iluminación nocturna”

4) Bookings & Activity

File: BookingsStep.js

Gestión de reservas

Method

Type: Single-select Chips

Question: “Gestión de reservas”

Options: WhatsApp · Excel / Manual · App · Mixto

Detalles de reservas

Price per Hour

Type: Dropdown

Label: “Precio medio por pista / hora”

Options: < 15 € · 15–20 € · 20–30 € · 30–40 € · 40 € +

Bookings/Week

Type: Dropdown

Label: “Reservas estimadas / semana”

Options: < 50 · 50–100 · 100–200 · 200–500 · 500 +

Annual Activity

Type: Dropdown

Label: “Actividad anual”

Options: Todo el año · Temporadas

5) Classes (Academy)

File: ClassesStep.js

Clases / Academia

Offers Classes

Type: Toggle (Sí / No)

Question: “¿Ofrecéis clases de pádel?”

Conditional Fields (si Sí):

Average Price

Type: Dropdown

Label: “Precio medio por clase”

Options: < 15 € · 15–25 € · 25–35 € · 35–50 € · 50 € +

Students/Week

Type: Dropdown

Label: “Alumnos estimados / semana”

Options: < 20 · 20–50 · 50–100 · 100–200 · 200 +

Classes/Week

Type: Dropdown

Label: “Clases estimadas / semana”

Options: < 10 · 10–25 · 25–50 · 50–100 · 100 +

6) Community & Events

File: CommunityStep.js

Nivel y horarios habituales

Club Level

Type: Multi-select Chips

Label: “Nivel medio del club”

Options: Iniciación · Intermedio · Avanzado · Competición

Time Slots

Type: Multi-select Chips

Label: “Horarios habituales”

Options: Mañanas · Mediodías · Tardes · Noches

Eventos

Has Events

Type: Toggle (Sí / No)

Question: “¿Organizáis eventos o competiciones?”

Conditional Fields (si Sí):

Event Types

Type: Multi-select Chips

Label: “Tipos de eventos”

Options: Torneos · Ligas · Eventos Sociales

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

Placeholder: “@tu_club o web”

Cómo nos has conocido

Type: Single-select (Chips o Radio)

Question: “¿Cómo nos has conocido?”

Options: Instagram · TikTok · YouTube · Google / Búsqueda en internet · Recomendación · Club / Evento · Otro

8) Verification

File: VerificationStep.js

Verificación del club

Verification Request

Type: Toggle (Sí / No)

Question: “¿Quieres verificar tu club en Padeliner?”

Conditional Fields (si Sí):

Documents

Type: File Upload

Label: “Documentos” (Licencia, Federación, CIF, etc.)

Formats: Images / PDF