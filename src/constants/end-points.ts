const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const REZZTORAN_AUTH_SERVICE = BASE_URL + "/api/auth";
const REZZTORAN_USER_SERVICE = BASE_URL + "/api/user";

export const END_POINTS = {
  AUTH_CONTROLLER: {
    LOGIN: `${REZZTORAN_AUTH_SERVICE}/login`,
  },
  USER_CONTOLLER: {
    USER_LIST: `${REZZTORAN_USER_SERVICE}`,
    CREATE_USER_BY_ROLE: `${REZZTORAN_USER_SERVICE}/create-user-by-role`,
  },
};
