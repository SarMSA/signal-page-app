import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import "bootstrap/dist/js/bootstrap";
import reportWebVitals from "./reportWebVitals";

import Provider from "./context/FirebaseContext";
import AuthProvider, { useAuthContext } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import App from "./App";
import StockImages from "./components/StockImages";
import SingleImage from "./components/SingleImage";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";

function AppRoutes() {
  const { currentUser } = useAuthContext();
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/images/:id" element={<SingleImage />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/profile" element={<Profile />} />
      {currentUser && <Route path="/stockImages" element={<StockImages />} />}
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Provider>
        <Router>
          <Navbar>
            <AppRoutes />
          </Navbar>
        </Router>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
