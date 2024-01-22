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
      <div className="d-flex flex-column justify-content-center mb-0">
        <button
          className="btn btn-link mb-5"
          onClick={() => {
            navigate(-1);
          }}
        >
          Back
        </button>
        <Card
          path={item.path}
          title={item.title}
          createdAt={item.createdAt}
          user={item.user}
          id={item.id}
          aspectRatio="1/1"
        />
      </div>
    </>
  );
}
