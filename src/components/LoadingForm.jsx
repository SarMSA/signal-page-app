import React, { useContext, useEffect } from "react";
import { Context } from "../context/FirebaseContext";
import Firestore from "../handlers/firestore";
import { useAuthContext } from "../context/AuthContext";
import Storage from "../handlers/storage";

const { writeDoc } = Firestore;
const { uploadFile, downloadFile } = Storage;
const Preview = () => {
  const { state } = useContext(Context);
  const {
    input: { path },
  } = state;
  return (
    path && (
      <div
        style={{
          backgroundColor: "#d4cbcb",
          borderRadius: "20px",
          height: "18rem",
          width: "18rem",
          marginBottom: "2rem",
        }}
      >
        <img
          src={path}
          style={{
            borderRadius: "5px",
          }}
          className="card-img-top h-100 w-100"
          alt={`preview`}
        />
      </div>
    )
  );
};

export default function LoadingForm() {
  const { dispatch, state, read } = useContext(Context);
  const { currentUser } = useAuthContext();
  const username = currentUser?.displayName.split(" ").join("");

  const { input } = state;
  const onChangeValue = (e) => {
    dispatch({ type: "setInput", payload: { value: e } });
  };
  const onSubmitValue = (e) => {
    e.preventDefault();
    if (!!currentUser) {
      uploadFile(state.input)
        .then(downloadFile)
        .then((url) => {
          writeDoc(
            { ...input, path: url, user: username.toLowerCase() },
            "stocks"
          ).then(() => {
            // dispatch({ type: "setItem" });
            read();
            dispatch({ type: "collapse", payload: { bool: false, url: null } });
          });
        });
    } else {
      dispatch({ type: "collapse", payload: { bool: false, url: null } });
      alert("please, log in first !");
    }
  };

  return (
    state.isCollapse && (
      <>
        <h2 className="mb-4">Upload Stock Image</h2>
        <div className="d-flex flex-column flex-md-row justify-content-around  align-items-center mb-5">
          <Preview />
          <form
            className="row g-3 w-50 text-center"
            onSubmit={onSubmitValue}
            name="loadingForm"
          >
            <div className="col">
              <label htmlFor="title" className="visually-hidden">
                title
              </label>
              <input
                onChange={onChangeValue}
                type="text"
                name="title"
                className="form-control w-100"
                id="dynamicTitle"
                // value={input}
                placeholder="title"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="file" className="visually-hidden">
                choosing file
              </label>
              <input
                onChange={onChangeValue}
                className="form-control"
                type="file"
                name="file"
                id="formFile"
              />
            </div>
            <div className="col text-end">
              <button type="submit" className="btn btn-success mb-3">
                Save changes
              </button>
            </div>
          </form>
        </div>
      </>
    )
  );
}
