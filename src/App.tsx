import { Navigate, Route, Routes } from "react-router-dom";
import { SharedLayout } from "./components/SharedLayout/SharedLayout";
import { lazy } from "react";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const NanniesPage = lazy(() => import("./pages/NanniesPage/NanniesPage"));
const FavoritesPage = lazy(() => import("./pages/FavoritesPage/FavoritesPage"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<SharedLayout />}>
          <Route path="nannies" element={<NanniesPage />} />
          <Route path="favorites" element={<FavoritesPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
