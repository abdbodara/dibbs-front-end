"use client";

import { Provider } from "react-redux";
import "./globals.css";
import store from "@/store";
import { useAuth } from "./util/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <AuthWrapper>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
              className={"min-w-max"}
            />
          </AuthWrapper>
        </Provider>
      </body>
    </html>
  );
}

function AuthWrapper({ children }) {
  useAuth();
  return children;
}
