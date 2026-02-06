// Onboarding Constants
// All form options and constants for the onboarding wizard

export const ROLES = [
    { id: 'Entrenador', label: 'ENTRENADOR', icon: 'user', desc: 'Gestiona tus clases, alumnos y cobros de forma profesional.' },
    { id: 'Club', label: 'CLUB', icon: 'building-2', desc: 'Administra tu centro, pistas y equipo de entrenadores.' },
    { id: 'Academia', label: 'ACADEMIA', icon: 'graduation-cap', desc: 'Organiza cursos, certificaciones y programas de formación.' },
    { id: 'Comercial', label: 'COMERCIAL', icon: 'briefcase', desc: 'Expande la red Padeliner y genera ingresos recurrentes.' },
];

export const LANGUAGES_LIST = [
    "Español",           // Spanish
    "English",           // English
    "Português",         // Portuguese (PT)
    "Português (BR)",    // Portuguese (BR)
    "Français",          // French
    "Italiano",          // Italian
    "Deutsch",           // German
    "Nederlands",        // Dutch
    "Svenska",           // Swedish
    "Dansk",             // Danish
    "Suomi",             // Finnish
    "Norsk",             // Norwegian
    "Polski",            // Polish
    "Русский",           // Russian
    "العربية",           // Arabic
    "עברית",             // Hebrew
    "Türkçe",            // Turkish
    "Ελληνικά",          // Greek
    "Bahasa Indonesia",  // Indonesian
    "ไทย",               // Thai
    "Filipino",          // Filipino
    "ދިވެހި",            // Dhivehi
    "中文",              // Chinese (Simplified)
    "日本語",            // Japanese
    "한국어",            // Korean
    "हिन्दी",            // Hindi
    "Tiếng Việt"         // Vietnamese
];

export const DAYS = ["L", "M", "X", "J", "V", "S", "D"];
export const SLOTS = ["Mañanas", "Mediodías", "Tardes", "Noches"];

export const STUDENTS_RANGES = [
    { label: "Menos de 5", value: "Menos de 5" },
    { label: "5-20", value: "5-20" },
    { label: "20-50", value: "20-50" },
    { label: "50-100", value: "50-100" },
    { label: "Más de 100", value: "Más de 100" }
];

export const CLASSES_RANGES = [
    { label: "Menos de 5", value: "< 5" },
    { label: "5-10", value: "5-10" },
    { label: "10-20", value: "10-20" },
    { label: "20-30", value: "20-30" },
    { label: "30-40", value: "30-40" },
    { label: "Más de 40", value: "> 40" }
];

export const PRICES = [
    { label: "< 10 €", value: "< 10 €" },
    { label: "10 €-20 €", value: "10 €-20 €" },
    { label: "20 €-30 €", value: "20 €-30 €" },
    { label: "30 €-40 €", value: "30 €-40 €" },
    { label: "40 €-50 €", value: "40 €-50 €" },
    { label: "50 €-60 €", value: "50 €-60 €" },
    { label: "> 60 €", value: "> 60 €" }
];

export const DISPLACEMENT_RANGES = [
    { label: "< 5 KM", value: "< 5 KM" },
    { label: "5-10 KM", value: "5-10 KM" },
    { label: "10-20 KM", value: "10-20 KM" },
    { label: "20-40 KM", value: "20-40 KM" },
    { label: "> 40 KM", value: "> 40 KM" }
];

export const DEDICATION_OPTS = ["100% Pádel", "Estudiante", "Tengo otro trabajo"];

export const EXPERIENCE_OPTS = [
    { label: "Menos de 3 años", value: "Menos de 3 años" },
    { label: "3-5 años", value: "3-5 años" },
    { label: "5-10 años", value: "5-10 años" },
    { label: "Más de 10 años", value: "Más de 10 años" }
];

export const SUPERPOWERS = [
    "Técnica (Golpes)",
    "Táctica (Juego)",
    "Físico (Potencia)",
    "Mental (Competición)",
    "Social (Dinamización)"
];

export const SPONSOR_TYPES = ["Pala", "Ropa / Calzado", "Otro"];

export const COMPETITION_ROLES = ["Competición Alta", "Influencer / Creador", "Ex-Jugador Pro"];

export const CERTIFICATIONS = [
    "Monitor Nacional",
    "Entrenador Nacional",
    "Fed. Autonómica",
    "Título Internacional"
];

export const COUNTRIES = [
    "España", "Argentina", "México", "Chile", "Colombia",
    "Portugal", "Italia", "Francia", "Alemania", "Reino Unido",
    "Estados Unidos", "Brasil", "Perú", "Uruguay", "Ecuador",
    "Suecia", "Países Bajos", "Bélgica", "Suiza", "Austria"
];

export const DISCOVERY_SOURCES = [
    "Instagram",
    "TikTok",
    "YouTube",
    "Google / Búsqueda en internet",
    "Recomendación",
    "Club / Evento",
    "Otro"
];

// Employment status for commercial role
export const COMMERCIAL_EMPLOYMENT = ["Trabajando", "Estudiante", "Sin nada"];


// Default form data structure
export const DEFAULT_FORM_DATA = {
    // Google Step
    displayName: "",
    acceptedTerms: false,

    // Role Step
    role: "",

    // Location Step
    country: "ES",
    state: "",
    city: "",
    languages: [],
    otherLanguage: "",

    // Operations Step
    hasMainClub: null,
    mainClub: "",
    wantsDisplacement: null,
    displacementRange: "",
    availability: [],
    studentsCount: "",
    classesPerWeek: "",
    pricePerHour: "",

    // Profile Step
    dedication: "",
    otherWork: "",
    yearsExperience: "",
    superpowers: [],

    // Marketing Step
    hasSponsors: null,
    sponsorTypes: [],
    sponsorBrand: "",
    discoverySource: "",
    instagram: "",

    // Verification Step
    hasCompeted: null,
    competitionRoles: [],
    competitionProof: "",
    competitionFiles: [],
    wantsVerification: null,
    certifications: [],
    certificationFiles: [],

    // Commercial Step
    commercialName: "",
    commercialPhone: "",
    commercialEmployment: "",
    commercialLanguages: [],

    // Club Languages
    clubLanguages: [],

    // Academy Languages
    academyLanguages: []
};
