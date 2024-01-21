import React from "react";
import Card from "./Card";
import { useLocation, useNavigate } from "react-router-dom";
import { useFirebaseContext } from "../context/FirebaseContext";

export default function SingleImage() {
  const navigate = useNavigate();
  const { state } = useFirebaseContext();
  const { state: routerState } = useLocation();

  const item = state.items.find((item) => item.id === routerState.id);

  return (
    <>
      <button
        className="btn btn-link mb-5"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      <div className="d-flex justify-content-center mb-0">
        <Card {...item} />
      </div>
    </>
  );
}
