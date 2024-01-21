import { useNavigate } from "react-router-dom";
export default function NotFound() {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="btn btn-link mb-5"
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
      <div className="d-flex justify-content-center ">
        <h1>Looks like you are lost</h1>
      </div>
    </>
  );
}
