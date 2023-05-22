import Cookies from "js-cookie";

const clearUserData = () => {
  localStorage.removeItem("@authToken");
  localStorage.removeItem("@userData");
  Cookies.remove("token");
};

const setAuthData = (token: string) => {
  localStorage.setItem("@authToken", token);
  Cookies.set("token", token, {
    expires: 1 / 24,
  });
};

const getAuthData = () => {
  const token = localStorage.getItem("@authToken");
  return token;
};

const setUserData = (data: any) => {
  if (data?.id) {
    localStorage.setItem("@userData", JSON.stringify(data));
  }
};

const getUserData = () => {
  const userData = localStorage.getItem("@userData");
  if (userData) {
    const user = JSON.parse(userData);
    return { ...user };
  }
  return {};
};

const Storage = {
  clearUserData,
  setAuthData,
  getAuthData,
  setUserData,
  getUserData,
};

export default Storage;
