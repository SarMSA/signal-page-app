import React from "react";
import { useAuthContext } from "../context/AuthContext";

export default function Profile() {
  const { currentUser } = useAuthContext();

  return (
    <>
      <h1 className="text-center">Profile</h1>
      <hr style={{ width: "50%", margin: "3rem auto" }} />
      <div className="d-flex flex-column flex-md-row justify-content-center align-items-center">
        <img
          style={{ borderRadius: "4px", marginBottom: "2rem" }}
          src={currentUser?.photoURL}
          alt={currentUser?.displayName}
          width={"150"}
          height={"150"}
        />
        <ul className="list-group mx-5">
          <li className="list-group-item">
            <span className="fs-5 text-capitalize">name : </span>
            {currentUser?.displayName}
          </li>
          <li className="list-group-item">
            <span className="fs-5 text-capitalize">email: </span>
            {currentUser?.email}
          </li>
        </ul>
      </div>
    </>
  );
}
