import React from "react";
import ReactDOM from "react-dom/client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "jotai";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Users from "./pages/Users";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <ToastContainer />
    <BrowserRouter>
      <Provider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
