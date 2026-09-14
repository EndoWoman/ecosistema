// Catálogo de perfiles del ecosistema. La autorización se verifica en el servidor.
export const roles = ["ceo", "medico", "enfermeria", "administracion", "marketing", "paciente"] as const;
export type Role = typeof roles[number];
