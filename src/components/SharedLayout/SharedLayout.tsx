import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

import Header from "../Header/Header";
import Loader from "../Loader/Loader";

import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

export const SharedLayout = () => {
  const location = useLocation();

  const isHome = location.pathname === "/";

  return (
    <div className={isHome ? "whiteBack" : ""}>
      {!isHome && <Header />}
      <ScrollToTopButton />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />
      <main>
        <Suspense
          fallback={
            <div>
              <Loader />
            </div>
          }
        >
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
