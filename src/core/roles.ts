// Catálogo inicial; no implementa autenticación ni autorización.
export const roles = ["ceo", "medico", "enfermeria", "administracion", "marketing", "paciente"] as const;
export type Role = (typeof roles)[number];
