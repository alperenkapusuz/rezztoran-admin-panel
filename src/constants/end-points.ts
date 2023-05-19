const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const REZZTORAN_AUTH_SERVICE = BASE_URL + "/api/auth";

export const END_POINTS = {
  AUTH_CONTROLLER: {
    LOGIN: `${REZZTORAN_AUTH_SERVICE}/login`,
  },
};
