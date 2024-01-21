import React, { useContext, useEffect } from "react";
import Search from "./Search";
import Dropdown from "./Dropdown";
import Navigation from "./Navigation";
import LoadingForm from "./LoadingForm";
import { useFirebaseContext } from "../context/FirebaseContext";
import { useAuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

function Navbar({ children }) {
  const { dispatch, state, read } = useFirebaseContext();
  const { authethy } = useAuthContext();

  const toggle = (bool) => {
    dispatch({ type: "collapse", payload: { bool } });
  };
  useEffect(() => {
    read();
    authethy();
  }, []);
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            ⚡ Imagestock
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <Navigation />
            <Search />
            <Dropdown />
          </div>
        </div>
      </nav>
      <div className="container d-flex flex-column align-items-center">
        <button
          className="btn btn-success align-self-end mt-5 mb-2"
          onClick={() => toggle(!state.isCollapse)}
        >
          {state.isCollapse ? "close" : "+Add"}
        </button>
        <LoadingForm />
        {children}
      </div>
    </>
  );
}

export default Navbar;
