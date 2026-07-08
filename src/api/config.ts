export const API_BASE = "http://0.0.0.0:8080";

// Hardcoded for now — replace with auth flow later
export const ADMIN_PASSWORD = "admin_password";

export const defaultHeaders = {
  "Content-Type": "application/json",
  Authorization: ADMIN_PASSWORD,
};
