import React, { FC } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layouts/AppLayout/index";
import HomePage from "../pages/home/HomePage";
import AnalysisPage from "../pages/analysis/AnalysisPage";
import FactorsPage from "../pages/factors/FactorsPage";

const SecureRoutes: FC = () => {

  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/home'} />} />

      <Route path={"/"} element={<AppLayout />}>
        <Route path="home" element={<HomePage />} />
        <Route path="factors" element={<FactorsPage />} />
        <Route path="analysis" element={<AnalysisPage />} />

      </Route>

      <Route path="*" element={<Navigate to={'/home'} />} />
    </Routes>
  );
};

export default SecureRoutes;
