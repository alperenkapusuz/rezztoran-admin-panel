import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import StorageService from "@services/storage";
import { Template, CSpin } from "@components/index";
import {
  NotFound,
  Login,
  UserAddMode,
  UserViewMode,
  RestaurantViewMode,
} from "@pages/index";
import React from "react";

const App = () => {
  const [role, setRole] = useState<
    "ADMIN" | "RESTAURANT_ADMIN" | "USER" | undefined
  >(undefined);
  const [loading, setLoading] = useState(true);

  const token = StorageService.getAuthData();

  const onLogin = () => {
    const userRole = StorageService.getUserData()?.role;
    setRole(userRole);
  };

  useEffect(() => {
    const fetchRole = async () => {
      if (token) {
        onLogin();
      }
      setLoading(false);
    };

    fetchRole();
  }, [token]);

  if (loading) {
    return <CSpin />;
  }

  const RouterAuth = () => {
    return (
      <Routes>
        <Route path="/" element={<Login onLogin={onLogin} />} />
      </Routes>
    );
  };

  const RouterAdmin = () => {
    return (
      <Routes>
        <Route element={<Template onLogin={onLogin} />}>
          <Route path="/restaurant" element={<RestaurantViewMode />} />
          <Route path="/kullanici-listesi" element={<UserViewMode />} />
          <Route path="/kullanici-ekle" element={<UserAddMode />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    );
  };

  const RouterRestaurantAdmin = () => {
    return (
      <Routes>
        <Route element={<Template onLogin={onLogin} />}>
          <Route path="/restaurant" element={<RestaurantViewMode />} />
          <Route path="/kullanici-listesi" element={<UserViewMode />} />
          <Route path="/kullanici-ekle" element={<UserAddMode />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    );
  };

  return (
    <BrowserRouter>
      {(role === undefined || role == "USER") && <RouterAuth />}
      {role === "ADMIN" && <RouterAdmin />}
      {role === "RESTAURANT_ADMIN" && <RouterRestaurantAdmin />}
    </BrowserRouter>
  );
};

export default App;
