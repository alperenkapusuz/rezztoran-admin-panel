const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const REZZTORAN_AUTH_SERVICE = BASE_URL + "/api/auth";
const REZZTORAN_USER_SERVICE = BASE_URL + "/api/user";
const REZZTORAN_RESTAURANT_SERVICE = BASE_URL + "/api/restaurant";

export const END_POINTS = {
  AUTH_CONTROLLER: {
    LOGIN: `${REZZTORAN_AUTH_SERVICE}/login`,
  },
  USER_CONTOLLER: {
    USER_LIST: `${REZZTORAN_USER_SERVICE}`,
    CREATE_USER_BY_ROLE: `${REZZTORAN_USER_SERVICE}/create-user-by-role`,
    DELETE_USER: `${REZZTORAN_USER_SERVICE}`,
    UPDATE_USER: `${REZZTORAN_USER_SERVICE}`,
  },
  REZZTORAN_RESTAURANT_SERVICE: {
    RESTAURANT_LIST: `${REZZTORAN_RESTAURANT_SERVICE}`,
    RESTAURANT_CREATE: `${REZZTORAN_RESTAURANT_SERVICE}`,
    RESTAURANT_UPDATE: `${REZZTORAN_RESTAURANT_SERVICE}`,
    RESTAURANT_DELETE: `${REZZTORAN_RESTAURANT_SERVICE}`,
  },
};
