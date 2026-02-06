Coach Onboarding Flow (sin páginas de 1 pregunta)
1) Professional Profile

File: ProfileStep.js

Dedicación

Type: Selection Cards (single)

Question: “Tu dedicación al pádel”

Options: 100% Pádel · Estudiante · Tengo otro trabajo

Experiencia

Type: Dropdown

Label: “Años de experiencia”

Options: Menos de 3 años · 3-5 años · 5-10 años · Más de 10 años

Diferencial (Superpowers)

Type: Selection Cards (multi)

Question: “Tu diferencial”

Options: Técnica (Golpes) · Táctica (Juego) · Físico (Potencia) · Mental (Competición) · Social (Dinamización)

2) Location & Languages

File: LocationStep.js

Ubicación

Type: Google Places Autocomplete

Fields Captured: Country, State, City

Idiomas

Type: Multi-select Chips

Question: “¿En qué idiomas impartes clases?”

Options: (desde LANGUAGES_LIST)

Additional Input: “Otro idioma” (Text input)

3) Club Details

File: ClubStep.js

Club principal

Type: Toggle (“Sí” / “No”)

Question: “¿Tienes un club principal?”

Conditional (si Sí):

Nombre del Club (Text Input, min 3 chars)

Desplazamiento

Type: Dropdown

Question: “¿Hasta dónde te desplazas?”

Options: < 5 KM · 5-10 KM · 10-20 KM · 20-40 KM · 40 KM

4) Availability, Pricing & Operations (todo junto)

File: AvailabilityStep.js

Disponibilidad semanal

Type: Interactive Grid

Columns (Days): L, M, X, J, V, S, D

Rows (Slots): Mañanas, Mediodías, Tardes, Noches

Precio por hora

Type: Dropdown

Label: “Precio por hora”

Options: < 10 € · 10-20 € · 20-30 € · 30-40 € · 40-50 € · 50-60 € · 60 €

Gestión de reservas

Type: Single-select Chips

Question: “Gestión de reservas”

Options: WhatsApp · Excel / Manual · App · Mixto

Estadísticas de actividad

Alumnos activos

Type: Dropdown

Label: “Alumnos activos”

Options: Menos de 5 · 5-20 · 20-50 · 50-100 · Más de 100

Clases/semana

Type: Dropdown

Label: “Clases/semana”

Options: < 5 · 5-10 · 10-20 · 20-30 · 30-40 · > 40

5) Marketing, Visibilidad & Descubrimiento (aquí encaja “cómo nos conociste”)

File: MarketingStep.js

Sponsors

Type: Toggle (“Sí” / “No”)

Question: “¿Tienes sponsors?”

Conditional (si Sí):

Type: Multi-select Chips

Options: Pala · Ropa / Calzado · Otro

Brand Name: Text Input (“Nombre de la marca principal”)

Redes sociales

Type: Text Input

Label: “Instagram”

Placeholder: “@tu_usuario”

Cómo nos has conocido

Type: Single-select (Chips o Radio)

Question: “¿Cómo nos has conocido?”

Options: Instagram · TikTok · YouTube · Google / Búsqueda en internet · Recomendación · Club / Evento · Otro

6) Verification

File: VerificationStep.js

Historial de competición

Type: Toggle (“Sí” / “No”)

Question: “¿Has competido?”

Conditional (si Sí):

Role: Multi-select Chips (Competición Alta · Influencer / Creador · Ex-Jugador Pro)

Proof: Textarea (“Enlaces o descripción”)

Documents: File Upload (Images/PDF)

Certificaciones

Type: Toggle (“Sí” / “No”)

Question: “¿Tienes títulos oficiales?”

Conditional (si Sí):

Certificates: Multi-select Chips (Monitor Nacional · Entrenador Nacional · Fed. Autonómica · Título Internacional)

Documents: File Upload (Images/PDF)