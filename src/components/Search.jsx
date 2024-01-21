import React, { useState } from "react";
import { useFirebaseContext } from "../context/FirebaseContext";

export default function Search() {
  const { filterSearch: filter } = useFirebaseContext();
  const [text, setText] = useState("");
  const handleOnChange = (e) => {
    setText(e.target.value);
    filter(e.target.value);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    filter(text);
  };
  return (
    <form className="d-flex" role="search" onSubmit={handleOnSubmit}>
      <input
        onChange={handleOnChange}
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={text}
      />
      <button className="btn btn-outline-success" type="submit">
        Search
      </button>
    </form>
  );
}
