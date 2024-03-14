import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

import Header from "../Header/Header";
import Loader from "../Loader/Loader";

import "react-toastify/dist/ReactToastify.css";
import ScrollToTopButton from "../ScrollToTopButton/ScrollToTopButton";

export const SharedLayout = () => {
  return (
    <div className="container">
      <Header />
      <ScrollToTopButton />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={true}
      />
      <Suspense
        fallback={
          <div>
            <Loader />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
};
