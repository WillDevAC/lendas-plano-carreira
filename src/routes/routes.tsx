import React from "react";

import { BrowserRouter, Route, Routes as RouterRoutes } from "react-router-dom";

import RankingPage from "../pages/Ranking";
import AdminPage from "../pages/Admin";

const Routes: React.FC = () => {
  return (
    <BrowserRouter basename="/plano-carreira">
      <RouterRoutes>
        <Route path="/" element={<RankingPage />} />
        <Route path="/admin-ranking" element={<AdminPage />} />
        <Route path="*" element={<RankingPage />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
